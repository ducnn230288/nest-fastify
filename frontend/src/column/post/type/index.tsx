import { EFormRuleType, EFormType, FormModel } from '@models';
import slug from 'slug';
import { loopMapSelect } from '@utils';

export default {
  form: (id?: string, tree?: any[]): FormModel[] => {
    return [
      {
        title: 'Name',
        name: 'name',
        formItem: {
          rules: [{ type: EFormRuleType.required }],
          onBlur: (value, form) => {
            if (value && !form.getFieldValue('code')) form.setFieldValue('code', slug(value).toUpperCase());
          },
        },
      },
      {
        title: 'Code',
        name: 'code',
        formItem: {
          rules: [{ type: EFormRuleType.required }, { type: EFormRuleType.max, value: 100 }],
          type: id ? EFormType.hidden : EFormType.text,
        },
      },
      {
        title: 'Là nhánh con',
        name: 'idChildren',
        formItem: {
          type: id ? EFormType.hidden : EFormType.treeSelect,
          list: loopMapSelect(tree),
        },
      },
    ];
  },
};
