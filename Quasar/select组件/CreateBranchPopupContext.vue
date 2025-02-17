<template>
  <div class='fit'>
    <form @submit.prevent.stop='onSubmit'>
      <div>
        <div class='row pl-2'>
          <div class='flex flex-row fit'>
            <div class='flex-0-0 flex flex-center'>
              <div class='tsync--dash-border rounded-borders flex-center' style='width: 110px; height: 110px'>
                <t-multi-icon :src='realIcon' size='60px'></t-multi-icon>
              </div>
            </div>
            <div class='flex-1-1 ml-5'>
              <q-item class='pa-0 mb-2'>
                <q-item-section>
                  <q-input clearable dense outlined lazy-rules v-model='inputValue[`name`]'
                           placeholder='用于显示的分支名称'
                           hint='显示的目标分支名称，上限 16 字符。'
                           :rules='[ (value) => (!!value && value.length > 0) || `请输入显示分支名称`, (value) => (!!value && value.length <= 16) || `显示分支名称不能大于 16 个字符` ]'
                           :error-message='errorMessage[`name`] || undefined' :error='!!errorMessage[`name`]'
                           @change='(value:any) => onValueChange(`name`, value)'
                           :ref='element => { inputRefs[`name`] = element }' />

                </q-item-section>
              </q-item>
              <t-multi-icon-input class='mb-2' v-model='inputValue[`icon`]'
                                  :errorMessage='errorMessage[`targetBranch`] || undefined'
                                  @change='(value:any) => onValueChange(`icon`, value)'
                                  :ref='(element:any) => { inputRefs[`icon`] = element }'></t-multi-icon-input>

            </div>
          </div>
        </div>
        <div class='px-3'>
          <div class='row' style='height: 40px'>
            <div class='flex content-center'>类型：</div>
            <template
              v-for='data in [{label:"git",value:"git",description:"",disable:false},{label:"cdn",value:"cdn",description:"暂缓开放",disable:true},{label:"url",value:"url",description:"",disable:false}]'
              :key='data.value'>
              <q-radio dense class='mr-3' v-model='inputValue[`typeId`]' :val='data.value'
                       :disable="step==='set'||data.disable"
                       :label='data.label'>
                <q-tooltip anchor='top middle' self='center middle'>{{ data.description }}</q-tooltip>
              </q-radio>
            </template>
          </div>
          <template v-if='!!errorMessage[`typeId`]'>
            <q-item-label class='tsync--text-hint pb-2 text-negative'>{{ errorMessage[`typeId`] }}</q-item-label>
          </template>
          <template v-if='!errorMessage[`typeId`]'>
            <q-item-label class='tsync--text-hint pb-2'>应用类型，请按照实际进行选择，TSync
              才能正确加载，首次确定后不可再次修改。
            </q-item-label>
          </template>
        </div>
        <!--        <q-item class='pa-0 mb-1'>-->
        <!--          <q-item-section>-->
        <!--            <div class='px-3'>-->
        <!--              <div class='row' style='height: 40px'>-->
        <!--                <div class='flex content-center'>是否强制更新：</div>-->
        <!--                <template v-for='data in [{label:"是",value:"true"},{label:"否",value:"false"}]' :key='data.value'>-->
        <!--                  <q-radio dense class='mr-3' v-model='inputValue[`forceUpdate`]' :val='data.value'-->
        <!--                           :label='data.label'>-->
        <!--                    <q-tooltip anchor='top middle' self='center middle'>{{ data.label }}</q-tooltip>-->
        <!--                  </q-radio>-->
        <!--                </template>-->
        <!--              </div>-->
        <!--              <template v-if='!!errorMessage[`forceUpdate`]'>-->
        <!--                <q-item-label class='tsync&#45;&#45;text-hint pb-2 text-negative'>{{ errorMessage[`forceUpdate`] }}-->
        <!--                </q-item-label>-->
        <!--              </template>-->
        <!--              <template v-if='!errorMessage[`forceUpdate`]'>-->
        <!--                <q-item-label class='tsync&#45;&#45;text-hint pb-2'>选择该分支代码更新后用户是否需要更新后才能使用-->
        <!--                </q-item-label>-->
        <!--              </template>-->
        <!--            </div>-->
        <!--          </q-item-section>-->
        <!--          <q-item-section class='ml-3' v-if="step==='set'">-->
        <!--            <div class='px-3'>-->
        <!--              <div class='row' style='height: 40px'>-->
        <!--                <div class='flex content-center'>是否改为主要分支：</div>-->
        <!--                <template v-for='data in [{label:"是",value:"true"},{label:"否",value:"false"}]' :key='data.value'>-->
        <!--                  <q-radio dense class='mr-3' v-model='inputValue[`isMainline`]' :val='data.value'-->
        <!--                           :label='data.label'>-->
        <!--                    <q-tooltip anchor='top middle' self='center middle'>{{ data.label }}</q-tooltip>-->
        <!--                  </q-radio>-->
        <!--                </template>-->
        <!--              </div>-->
        <!--              <template v-if='!!errorMessage[`isMainline`]'>-->
        <!--                <q-item-label class='tsync&#45;&#45;text-hint pb-2 text-negative'>{{ errorMessage[`isMainline`] }}-->
        <!--                </q-item-label>-->
        <!--              </template>-->
        <!--              <template v-if='!errorMessage[`isMainline`]'>-->
        <!--                <q-item-label class='tsync&#45;&#45;text-hint pb-2'>选择该分支是否成为主要分支-->
        <!--                </q-item-label>-->
        <!--              </template>-->
        <!--            </div>-->
        <!--          </q-item-section>-->
        <!--        </q-item>-->
        <!--        <q-item class='pa-0 mb-2' v-if="step==='set'">-->
        <!--          <q-item-section v-if="step==='set'">-->
        <!--            <div class='px-3'>-->
        <!--              <div class='row' style='height: 40px'>-->
        <!--                <div class='flex content-center'>是否改为测试分支：</div>-->
        <!--                <template v-for='data in [{label:"是",value:"true"},{label:"否",value:"false"}]' :key='data.value'>-->
        <!--                  <q-radio dense class='mr-3' v-model='inputValue[`isTest`]' :val='data.value'-->
        <!--                           :label='data.label'>-->
        <!--                    <q-tooltip anchor='top middle' self='center middle'>{{ data.label }}</q-tooltip>-->
        <!--                  </q-radio>-->
        <!--                </template>-->
        <!--              </div>-->
        <!--              <template v-if='!!errorMessage[`isTest`]'>-->
        <!--                <q-item-label class='tsync&#45;&#45;text-hint pb-2 text-negative'>{{ errorMessage[`isTest`] }}-->
        <!--                </q-item-label>-->
        <!--              </template>-->
        <!--              <template v-if='!errorMessage[`isTest`]'>-->
        <!--                <q-item-label class='tsync&#45;&#45;text-hint pb-2'>选择该分支是否成为测试分支-->
        <!--                </q-item-label>-->
        <!--              </template>-->
        <!--            </div>-->
        <!--          </q-item-section>-->
        <!--          <q-item-section class='ml-3' v-if="step==='set'">-->
        <!--            <div class='px-3'>-->
        <!--              <div class='row' style='height: 40px'>-->
        <!--                <div class='flex content-center'>是否激活：</div>-->
        <!--                <template v-for='data in [{label:"是",value:"true"},{label:"否",value:"false"}]' :key='data.value'>-->
        <!--                  <q-radio dense class='mr-3' v-model='inputValue[`enable`]' :val='data.value'-->
        <!--                           :label='data.label'>-->
        <!--                    <q-tooltip anchor='top middle' self='center middle'>{{ data.label }}</q-tooltip>-->
        <!--                  </q-radio>-->
        <!--                </template>-->
        <!--              </div>-->
        <!--              <template v-if='!!errorMessage[`enable`]'>-->
        <!--                <q-item-label class='tsync&#45;&#45;text-hint pb-2 text-negative'>{{ errorMessage[`enable`] }}-->
        <!--                </q-item-label>-->
        <!--              </template>-->
        <!--              <template v-if='!errorMessage[`enable`]'>-->
        <!--                <q-item-label class='tsync&#45;&#45;text-hint pb-2'>选择该分支是否激活-->
        <!--                </q-item-label>-->
        <!--              </template>-->
        <!--            </div>-->
        <!--          </q-item-section>-->
        <!--        </q-item>-->
        <q-input class='mb-2' clearable dense outlined lazy-rules v-model='inputValue[`targetUrl`]'
                 placeholder='目标分支链接地址' hint='目标分支的具体链接地址，用户可快速跳转到目标分支仓库。'
                 :rules='[(value) => (!!value && value.length > 0) || `请输入分支链接`, (value) => (!value || /^https?:\/\/.*$/.test(value)) || `请输入以 http:// 或 https:// 开头的网址` ]'
                 :error-message='errorMessage[`targetUrl`] || undefined' :error='!!errorMessage[`targetUrl`]'
                 @change='(value:any) => onValueChange(`targetUrl`, value)'
                 @update:model-value='(value:any) => modalValueChange(`targetUrl`, value)'
                 :ref='element => { inputRefs[`targetUrl`] = element }'
        >
        </q-input>
        <div class='mb-2'>
          <q-select dense lazy-rules outlined v-model='inputValue[`targetBranch`]' :options="branchList"
                    :disable="step==='set'||inputValue[`typeId`]==='url'"
                    label="目标分支"
                    :rules='inputValue[`typeId`]==="git"?[ (value) => (!!value && value.length > 0) || `请输入目标分支`, (value) => (!!value && value.length <= 32) || `分支不能大于 16 个字符`,(value)=>(/^[^\s~:?[\]]+$/.test(value)) || `目标分支不能包含特殊符号`]:[]'
                    use-input
                    input-debounce="0"
                    @filter="filterBranchFn"
                    @new-value="createBranchKey"
                    use-chips
                    hint='请下拉选择分支或者输入分支名按回车键新建分支'
                    :error-message='errorMessage[`targetBranch`] || undefined'
                    :error='!!errorMessage[`targetBranch`]'
                    @change='(value:any) => onValueChange(`targetBranch`, value)'
                    :ref='element => { inputRefs[`targetBranch`] = element }'>
            <template v-slot:after>
              <div class='q-gutter-x-sm row no-wrap'>
                <q-btn flat dense round color='black' icon='mdi-plus-circle-outline'>
                  <q-tooltip anchor='center left' self='center right'>新建git分支</q-tooltip>
                </q-btn>
              </div>
            </template>
          </q-select>
        </div>
        <div class='mb-2'>
<!--          <q-input class='my-2' clearable autogrow dense outlined lazy-rules v-model='inputValue[`description`]'-->
<!--                   placeholder='分支描述' hint='简要描述分支，上限 128 字符。'-->
<!--                   input-style='min-height: 54px; max-height: 54px'-->
<!--                   :rules='[ (value) => (!!value && value.length > 0) || `请输入分支描述`, (value) => (!!value && value.length <= 128) || `分支描述不能大于 128 个字符` ]'-->
<!--                   :error-message='errorMessage[`description`] || undefined' :error='!!errorMessage[`description`]'-->
<!--                   @change='(value:any) => onValueChange(`description`, value)'-->
<!--                   :ref='element => { inputRefs[`description`] = element }' />-->
        </div>
        <q-input class='my-2' clearable autogrow dense outlined lazy-rules v-model='inputValue[`description`]'
                 placeholder='分支描述' hint='简要描述分支，上限 128 字符。'
                 input-style='min-height: 54px; max-height: 54px'
                 :rules='[ (value) => (!!value && value.length > 0) || `请输入分支描述`, (value) => (!!value && value.length <= 128) || `分支描述不能大于 128 个字符` ]'
                 :error-message='errorMessage[`description`] || undefined' :error='!!errorMessage[`description`]'
                 @change='(value:any) => onValueChange(`description`, value)'
                 :ref='element => { inputRefs[`description`] = element }' />

        <q-input class='mb-2' clearable dense outlined lazy-rules v-model='inputValue[`urlWiki`]'
                 placeholder='分支 Wiki 地址' hint='分支的 Wiki 地址，用户可快速跳转，学习使用方法，可以不填。'
                 :rules='[ (value) => (!value || /^https?:\/\/.*$/.test(value)) || `请输入以 http:// 或 https:// 开头的网址` ]'
                 :error-message='errorMessage[`urlWiki`] || undefined' :error='!!errorMessage[`urlWiki`]'
                 @change='(value:any) => onValueChange(`urlWiki`, value)'
                 :ref='element => { inputRefs[`urlWiki`] = element }' />

        <q-btn color='primary' outline class='full-width' type='submit' :label='submitText' :loading='submitting > 0'>
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>

      </div>

    </form>
  </div>
</template>

<script lang='ts' src='./CreateBranchPopupContext.ts' />
<style lang='scss' src='./CreateBranchPopupContext.scss' />
<style scoped lang='scss' src='./CreateBranchPopupContext.scoped.scss' />
