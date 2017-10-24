/**
 * Created by liyang on 2017/6/9.
 */

var validatorTools = {
    nameValidation:function (value, vm) {
        var regExp=/^[\u4e00-\u9fa5\s]{2,20}$|^[A-Za-z\s]{2,20}$/;
        return regExp.test(value);
    },
    psdValidation:function (value, vm) {
        var regExp=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        return regExp.test(value);
    },
    isMobilePhone:function (value, vm) {
        var regExp=/^0?1[3|4|5|8][0-9]\d{8}$/;
        return regExp.test(value);
    },
    optionalIsPhone:function (value, vm) {
        var regExp=/^0?1[3|4|5|8][0-9]\d{8}$/;

        if(!value){
            return true;
        }
        else {
            return regExp.test(value);
        }
    },
    isIdentifyCard:function (value, vm) {
        var regExp15=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        var regExp18=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if(!value){
            return true;
        }
        else {
            return regExp15.test(value) || regExp18.test(value);
        }
    }
}


export default validatorTools;