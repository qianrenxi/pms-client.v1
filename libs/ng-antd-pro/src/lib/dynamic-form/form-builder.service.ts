import { Injectable } from '@angular/core';
import { FormFieldFactory } from './form-field-factory.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Field } from './def/field';
import { isArray } from 'util';

@Injectable()
export class FormBuilderService {

    constructor(
        private formFieldFactory: FormFieldFactory,
        private fb: FormBuilder
    ) {}

    group(fieldsConfig: {
        [key: string]: any
    }, extra?: {
        [key: string]: any | null
    }): {fields: Field<any>[], formGroup: FormGroup, extendForm?: any} {
        const keys: string[] = Object.keys(fieldsConfig);
        if (!fieldsConfig || keys.length === 0) {
            return;
        }
        
        const formGroup: FormGroup = this.fb.group(fieldsConfig);
        const fields: Field<any>[] = keys.map(key => {
            const fieldConfig = fieldsConfig[key];
            if (!isArray(fieldConfig)) {
                console.warn('Need array');
                return ;
            }
            const [value, validators, asyncValidators, _fieldOptions] = [...fieldConfig];
            // let value = fieldConfig.length >= 1 ? fieldConfig[0] : undefined;
            // let fieldOptions = fieldConfig.length >= 4 ? fieldConfig[3] : {};
            const fieldOptions = _fieldOptions || {};
            fieldOptions['key'] = key;
            fieldOptions['value'] = value;
            fieldOptions['validators'] = validators;
            fieldOptions['asyncValidators'] = asyncValidators;
            fieldOptions['controlType'] = fieldOptions['controlType'] || 'text';

            return this.formFieldFactory.getField(fieldOptions);
        }).filter(it => !!it);

        return {fields, formGroup};
    }

    group2(fieldsConfig: Field<any>[]): {fields: Field<any>[], formGroup: FormGroup, extendForm?: any} {
        const formGroup: FormGroup = this.fb.group({});
        const fields: Field<any>[] = fieldsConfig.map(fieldOptions => {
            const formControl = formGroup.addControl(fieldOptions.key, new FormControl());
            return this.formFieldFactory.getField(fieldOptions);
        }).filter(it => !!it);

        return {fields, formGroup};
    }
}