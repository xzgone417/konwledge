// 防抖
export function myDebounce(f: any, t: number | undefined, im = false) {
    let timer: string | number | NodeJS.Timeout | undefined;
    let flag = true;
    return (...args: any) => {
        // 需要立即执行的情况
        if (im) {
            if (flag) {
                f(...args);
                flag = false;
            } else {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    f(...args);
                    flag = true;
                    clearTimeout(timer as any);
                }, t);
            }
        } else {
            // 非立即执行的情况
            clearTimeout(timer);
            timer = setTimeout(() => {
                f(...args);
                clearTimeout(timer as any);
            }, t);
        }
    };
}
// 节流
export function myThrottle(f: any, t: number | undefined, im = false) {
    let flag = true;
    return (...args: any) => {
        if (flag) {
            flag = false
            im && f(...args)
            setTimeout(() => {
                !im && f(...args)
                flag = true
            }, t)
        }
    }
}
