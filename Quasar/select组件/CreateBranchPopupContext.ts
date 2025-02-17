// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import {
  defineComponent, computed, ref,
  onMounted, PropType, Ref
} from 'vue';
import { QInput } from 'quasar';
// --------------------------------------------------------------------------------
import { REGEXP_URL } from 'app/src-global/scripts/interface/common';
import RecordUtil from 'app/src-global/scripts/util/RecordUtil';
import { Out } from 'app/src-global/scripts/common/csharp';
import { TSyncResponse } from 'app/src-global/scripts/module/http/interface/common';
// --------------------------------------------------------------------------------
import ApplicationUtil from 'src/scripts/module/application/util/ApplicationUtil';
import { IsAppIdValidResponseData } from 'src/scripts/module/application/interface/common';
import { Application, ApplicationBranch } from 'app/src-global/scripts/module/application/interface/common';
import {
  APPLICATION_TYPE_EXTEND_DEFAULT,
  GetApplicationTypeExtendResponseData
} from 'src/scripts/module/config/interface/common';
import ConfigUtil from 'src/scripts/module/config/util/ConfigUtil';
// ================================================================================

export default defineComponent({
  emits: [
    'callback',
    'setSubmitting'
  ],
  props: {
    applicationBranch: { type: Object as PropType<ApplicationBranch> },
    applicationData: { type: Object as PropType<Application> },
    step: { type: String },
    callbackSubmit: { type: Function as PropType<(data: Record<string, unknown>, error_message: Ref<Record<string, string>>) => Promise<boolean>>, required: true }
  },
  setup(props, context) {
    // ------------------------------------------------------------------------------
    // * Vue
    // ------------------------------------------------------------------------------
    onMounted(async () => {
      branchInfo.value = props.applicationBranch;
      await _refresh();
      await getUGitInfo();
    });
    // ------------------------------------------------------------------------------
    // * Interface
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Option
    // ------------------------------------------------------------------------------
    const realIcon = computed<string>(() => REGEXP_URL.test(inputValue.value['icon']) ? inputValue.value['icon'] : `mdi-${inputValue.value['icon'] || ''}`);
    // ------------------------------------------------------------------------------
    // * Component
    // ------------------------------------------------------------------------------
    const inputRefs = ref<Record<string, QInput>>({}) as any;
    // ------------------------------------------------------------------------------
    // * Parameter
    // ------------------------------------------------------------------------------
    const _applicationTypeExtend = ref<GetApplicationTypeExtendResponseData>(APPLICATION_TYPE_EXTEND_DEFAULT);
    // ------------------------------------------------------------------------------
    const submitting = ref<number>(0);
    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------
    const inputValue = ref<Record<string, string>>({});
    const errorMessage = ref<{ [key: string]: any }>({});
    const submitText = ref<string>('提交');
    const branchList = ref<string[]>([]);
    const initBranchList = ref<string[]>([]);
    const branchTargetUrl = ref<string>('');
    const branchInfo = ref<any>({});
    const selectedBranch = ref<string>('');
    const branchInputValue = ref<string>('');
    const isCreateBranch = ref<boolean>(false);
    // ------------------------------------------------------------------------------
    // * Lifecycle
    // ------------------------------------------------------------------------------
    async function _refresh() {
      if (props?.step === 'create') {
        if (branchInfo.value?.icon.startsWith('mdi-')) {
          inputValue.value['icon'] = branchInfo.value?.icon.slice(4);
        } else {
          inputValue.value['icon'] = branchInfo.value?.icon || '';
        }
        inputValue.value['forceUpdate'] = 'true';
        inputValue.value['targetUrl'] = branchInfo.value?.targetUrl || '';
        inputValue.value['typeId'] = branchInfo.value?.typeId || '';
      } else if (props?.step === 'set') {
        if (branchInfo.value?.icon.startsWith('mdi-')) {
          inputValue.value['icon'] = branchInfo.value?.icon.slice(4);
        } else {
          inputValue.value['icon'] = branchInfo.value?.icon || '';
        }
        inputValue.value['name'] = branchInfo.value?.name || '';
        inputValue.value['targetBranch'] = branchInfo.value?.targetBranch || '';
        inputValue.value['typeId'] = branchInfo.value?.typeId || '';
        inputValue.value['targetUrl'] = branchInfo.value?.targetUrl || '';
        inputValue.value['description'] = branchInfo.value?.description || '';
        inputValue.value['urlWiki'] = branchInfo.value?.urlWiki || '';
        inputValue.value['forceUpdate'] = branchInfo.value?.forceUpdate.toString() || 'true';
        inputValue.value['isMainline'] = branchInfo.value?.isMainline.toString() || 'false';
        inputValue.value['isTest'] = branchInfo.value?.forceUpdate.toString() || 'false';
        inputValue.value['enable'] = branchInfo.value?.forceUpdate.toString() || 'false';
      }

    }

    function encodeURLForQueryString(url: string) {
      // 去除.com以及它后面紧跟的/
      url = url.replace(/.*?\.com\//, '');
      // 去除末尾的.git
      url = url.replace(/\.git$/, '');
      // 编码URL
      return encodeURIComponent(url)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
    }

    function filterBranchFn(val: any, update: any) {
      if (val === '') {
        update(() => {
          branchList.value = initBranchList.value;
        });
        return;
      }
      //
      update(() => {
        const needle = val.toLowerCase();
        branchList.value = branchList.value.filter(v => v.toLowerCase().indexOf(needle) > -1);
      });

    }

    function createBranchKey(val: string, done: any) {
      // 如果输入的值不在选项列表中，可以将其添加到选项列表中
      if (val.length > 0 && !branchList.value.includes(val)) {
        done(val, 'add-unique'); // 'add-unique' 是一个特殊的指令，表示添加一个唯一的值
      }
    }

    function modalValueChange(key: string, value: any) {
      console.info('🚀XZG ~CreateBranchPopupContext ~modalValueChange ', value);
      if (key === 'targetUrl') {
        inputValue.value['targetBranch'] = '';

      }
    }

    async function getUGitInfo() {
      branchTargetUrl.value = encodeURLForQueryString(inputValue.value['targetUrl']);
      const res = await ApplicationUtil.getUGitBranchList(branchTargetUrl.value, {
        page: 1,
        per_page: 100
      });
      if (res?.data.status === 200) {
        branchList.value = res?.data?.data?.map((item: any) => {
          return item.name;
        });
        initBranchList.value = branchList.value;
      }
    }

    // ------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    // * Emit
    // ------------------------------------------------------------------------------
    function setSubmitting(value: boolean) {
      submitting.value += value ? 1 : -1;
      context.emit('setSubmitting', value);
    }

    async function doRefresh() {
      props.applicationData?.branches.forEach((branch: ApplicationBranch) => {
        if (branch.name === inputValue.value['targetBranch']) {
          branchInfo.value = branch;
        }
      });
      await _refresh();
    }

// ------------------------------------------------------------------------------
// * Function
// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
//# region Data
// ------------------------------------------------------------------------------
    function _calcData() {
      const data: Record<string, unknown> = {};
      for (const key in inputRefs.value) {
        data[key] = '';
      }
      for (const key in inputValue.value) {
        if (key === 'icon') {
          data[key] = realIcon.value;
        } else {
          data[key] = (inputValue.value[key] || '');
        }
      }
      return data;
    }

    function checkRadio() {
      delete errorMessage.value['typeId'];
      delete errorMessage.value['forceUpdate'];
      if (!(inputValue.value['forceUpdate'] === 'true' || inputValue.value['forceUpdate'] === 'false')) {
        errorMessage.value['forceUpdate'] = '请选择是否强制更新。';
        return false;
      }
      if (!inputValue.value['typeId']) {
        errorMessage.value['typeId'] = '请选择该分支的具体类型 。';
        return false;
      }
      return true;
    }

    async function checkBranch() {
      if (props?.step === 'create') {
        if (branchList.value.includes(inputValue.value['targetBranch'])) {
          return false;
        } else {
          if (inputValue.value['typeId'] !== 'git') {
            return false;
          }
          const res = await ApplicationUtil.tryCreateUGitBranch(branchTargetUrl.value, {
            branch_name: inputValue.value['targetBranch'],
            ref: props.applicationBranch?.targetBranch,
            description: inputValue.value['description']
            // branch_type?: string;
          });
          return res?.data.status === 200;

        }
      } else if (props?.step === 'set') {

      }
    }

// ------------------------------------------------------------------------------
//# endregion
// ------------------------------------------------------------------------------
//# region Event
// ------------------------------------------------------------------------------
    async function onValueChange(key: string, value: any) {
      if (key === 'targetBranch' && typeof value !== 'string') {
        return;
      }
      delete errorMessage.value[key];
      inputValue.value[key] = value;
      if (key === 'targetBranch') {
        await doRefresh();
      }
    }

    async function onSubmit() {
      submitText.value = '提交';
      setSubmitting(true);

      let hasError = 0;
      if (!checkRadio()) {
        hasError++;
      }
      for (const key in inputRefs.value) {
        console.info('22222222222222222🚀XZG ~CreateBranchPopupContext ~onSubmit ', inputRefs.value[key]);
        if (inputRefs.value[key] === null) {
          continue;
        }
        inputRefs.value[key].validate();
        if (inputRefs.value[key].hasError) {
          hasError++;
        }
      }
      const data = _calcData();
      if (hasError === 0) {
        const hasNewBranch = await checkBranch();
        if (await props.callbackSubmit(data, errorMessage)) {
          context.emit('callback', data);
        } else {
          submitText.value = '出现错误，请重试';
        }
      }
      setSubmitting(false);
    }

// ------------------------------------------------------------------------------
//# endregion
// ------------------------------------------------------------------------------

    return {
      // ------------------------------------------------------------------------------
      // * Option
      // ------------------------------------------------------------------------------
      realIcon,
      // ------------------------------------------------------------------------------
      // * Component
      // ------------------------------------------------------------------------------
      inputRefs,
      // ------------------------------------------------------------------------------
      // * Parameter
      // ------------------------------------------------------------------------------
      submitting,
      // ------------------------------------------------------------------------------
      inputValue,
      errorMessage,
      submitText,
      branchList,
      selectedBranch,
      branchInputValue,
      isCreateBranch,
      // ------------------------------------------------------------------------------
      // * Emit
      // ------------------------------------------------------------------------------
      setSubmitting,
      doRefresh,
      filterBranchFn,
      createBranchKey,
      modalValueChange,
      // ------------------------------------------------------------------------------
      // * Function
      // ------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------
      onValueChange,
      onSubmit
    };

  }
})
;
