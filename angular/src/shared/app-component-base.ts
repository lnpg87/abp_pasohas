import {
    PermissionCheckerService,
    FeatureCheckerService,
    LocalizationService,
    MessageService,
    AbpMultiTenancyService,
    NotifyService,
    SettingService
} from 'abp-ng2-module';
import { Injector } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';

import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';

import { NgForm } from '@angular/forms';
import { AppSessionService } from './session/app-session.service';

export abstract class AppComponentBase {

    localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

    localization: LocalizationService;
    permission: PermissionCheckerService;
    feature: FeatureCheckerService;
    notify: NotifyService;
    setting: SettingService;
    message: MessageService;
    multiTenancy: AbpMultiTenancyService;
    appSession: AppSessionService;
    primengTableHelper: PrimengTableHelper;

    constructor(injector: Injector) {
        this.localization = injector.get(LocalizationService);
        this.permission = injector.get(PermissionCheckerService);
        this.feature = injector.get(FeatureCheckerService);
        this.notify = injector.get(NotifyService);
        this.setting = injector.get(SettingService);
        this.message = injector.get(MessageService);
        this.multiTenancy = injector.get(AbpMultiTenancyService);
        this.appSession = injector.get(AppSessionService);
        this.primengTableHelper = new PrimengTableHelper();
    }

    flattenDeep(array) {
        return array.reduce((acc, val) =>
            Array.isArray(val) ?
                acc.concat(this.flattenDeep(val)) :
                acc.concat(val),
            []);
    }

    l(key: string, ...args: any[]): string {
        args.unshift(key);
        args.unshift(this.localizationSourceName);
        return this.ls.apply(this, args);
    }

    ls(sourcename: string, key: string, ...args: any[]): string {
        let localizedText = this.localization.localize(key, sourcename);

        if (!localizedText) {
            localizedText = key;
        }

        if (!args || !args.length) {
            return localizedText;
        }

        args.unshift(localizedText);
        return abp.utils.formatString.apply(this, this.flattenDeep(args));
    }

    isGranted(permissionName: string): boolean {
        return this.permission.isGranted(permissionName);
    }

    isGrantedAny(...permissions: string[]): boolean {
        if (!permissions) {
            return false;
        }

        for (const permission of permissions) {
            if (this.isGranted(permission)) {
                return true;
            }
        }

        return false;
    }

    s(key: string): string {
        return abp.setting.get(key);
    }

    validaForm(form: NgForm): string {
        var res = '';
        Object.keys( form.controls).forEach(key => {
            form.controls[key].markAsDirty();

            if (form.controls[key].errors) {
                if (form.controls[key].errors.required) {
                    if (res==='') {
                        res='';
                    } else {
                        res+=', ';
                    }
                    res+=key;
                }
            }
        });
        return res;
    }

    public formarFiltro(propiedad: string, valor: any, esString = false, ignorarValidacionNulos = false): string {

        if (!ignorarValidacionNulos) {
            if (valor === undefined || valor === null) {
                if (esString) {
                    valor = "0";
                } else {
                    valor = 0;
                }
            }
        }
        return propiedad + '=' + (esString ? valor.toString() : valor);
    }

    public agregarValorObligatorio(valor: string, nombreCampo: string): string {
        if (valor==='') {
            valor='';
        } else {
            valor+=', ';
        }
        valor+=nombreCampo;

        return valor;
    }
}
