import React, {useState} from 'react';
import { setLang, ColCell } from '@antv/s2';
import { SheetComponent, Switcher } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';
setLang('en_US');
const PALETTE_COLORS = [
  {
    limit: -50,
    background: 'rgb(62,144,109)',
    color: 'black',
  },
  {
    limit: -35,
    background: 'rgb(74,181,120)',
    color: 'black',
  },
  {
    limit: -20,
    background: 'rgb(112,196,121)',
    color: 'black',
  },
  {
    limit: -5,
    background: 'rgb(150,212,164)',
    color: 'black',
  },
  {
    limit: 10,
    background: 'rgb(190,226,188)',
    color: 'black',
  },
  {
    limit: 25,
    background: 'rgb(238,229,229)',
    color: 'black',
  },
  {
    limit: 40,
    background: 'rgb(243,187,161)',
    color: 'white',
  },
  {
    limit: 55,
    background: 'rgb(238,154,119)',
    color: 'white',
  },
  {
    limit: 70,
    background: 'rgb(235,123,85)',
    color: 'white',
  },
  {
    limit: 85,
    background: 'rgb(230,91,55)',
    color: 'white',
  },
  {
    limit: 100,
    background: 'rgb(214,61,33)',
    color: 'white',
  },
];

const GROUP_COLOR: any = {
  'people-group-a': 'rgb(99,133,241)',
  'people-group-b': 'rgb(116,213,157)',
};

const GROUP_SEPARATOR_WIDTH = 4;

const getFormatter =
  (enablePrefix = false) =>
    (value: any) => {
      const prefix = enablePrefix && value > 0 ? '+' : '';
      const suffix = value !== 0 ? '%' : '';
      return `${prefix}${value}${suffix}`;
    };

const getTargetColor = (value: any) =>
  PALETTE_COLORS.find((color) => color.limit >= value) ??
  PALETTE_COLORS[PALETTE_COLORS.length - 1];

class CustomColCell extends ColCell {
  initCell() {
    super.initCell();
    this.renderGroupSeparator();
  }

  renderGroupSeparator() {
    const { label, isLeaf } = this.meta;
    if (!isLeaf || label === 'people-group-delta') {
      return;
    }

    const fill = GROUP_COLOR[label];
    const { x, y, height } = this.textShape.getBBox();
    this.addShape('rect', {
      attrs: {
        x: x - GROUP_SEPARATOR_WIDTH * 1.5,
        y,
        height,
        width: GROUP_SEPARATOR_WIDTH,
        fill,
      },
    });
  }
}

const Page = () => {
  const s2DataConfig = {
    fields: {
      rows: ['type', 'job', 'age'],
      columns: ['city'],
      values: ['people-group-a', 'people-group-b', 'people-group-delta'],
      valueInCols: true,
    },
    meta: [
      {
        field: 'type',
        name: 'Type',
      },
      {
        field: 'job',
        name: 'Job',
      },
      {
        field: 'age',
        name: 'Age',
      },
      {
        field: 'city',
        name: 'City',
      },
      {
        field: 'people-group-a',
        name: 'People Group A',
        formatter: getFormatter(),
      },
      {
        field: 'people-group-b',
        name: 'People Group B',
        formatter: getFormatter(),
      },
      {
        field: 'people-group-delta',
        name: 'People Group Delta',
        formatter: getFormatter(true),
      },
    ],
    data,
  };

  const s2Options: any = {
    width: 1200,
    height: 480,
    hierarchyType: 'tree',
    tooltip: {
      operation: {
        trend: true,
        hiddenColumns: true,
      },
    },
    interaction: {
      selectedCellsSpotlight: true,
      autoResetSheetStyle: true,
      hoverHighlight: true,
      hoverAfterScroll: true,
    },
    style: {
      layoutWidthType: 'colAdaptive',
      cellCfg: {
        width: 100,
      },
    },
    conditions: {
      text: [
        {
          field: 'people-group-delta',
          mapping(value: any) {
            const { color } = getTargetColor(value);
            return {
              fill: color,
            };
          },
        },
      ],
      background: [
        {
          field: 'people-group-delta',
          mapping(value: any) {
            const { background } = getTargetColor(value);
            return {
              fill: background,
            };
          },
        },
      ],
    },
    colCell(viewMeta: any, spreadsheet: any, headerConfig: any) {
      return new CustomColCell(viewMeta, spreadsheet, headerConfig);
    },
    totals: {
      row: {
        subTotalsDimensions: [ 'job', 'type' ],
        showGrandTotals: true,
        calcTotals: {
          aggregation: 'SUM',
        },
        showSubTotals: true,
        calcSubTotals: {
          aggregation: 'SUM',
        },
      },
      col: {
        subTotalsDimensions: [ 'job' ],
        showGrandTotals: true,
        calcTotals: {
          aggregation: 'AVG',
        },
        showSubTotals: true,
        calcSubTotals: {
          aggregation: 'AVG',
        },
      },
    },
  };

  const theme = {
    dataCell: {
      bolderText: {
        fill: 'rgb(84,84,84)',
      },
      text: {
        fill: 'rgb(84,84,84)',
      },
    },
  };
  const [dataCfg, setDataCfg]: any = useState(s2DataConfig);

  const [sortParams, setSortParams]: any = React.useState([]);

  // rows: ['type', 'job', 'age'],
  //   columns: ['city'],
  //   values: ['people-group-a', 'people-group-b', 'people-group-delta'],
  const defaultSwitcherFields = {
    rows: {
      items: [{ id: 'type', displayName: 'Type' }, { id: 'job', displayName: 'Job' },  { id: 'age', displayName: 'Age' }, ],
    },
    columns: {
      items: [{ id: 'city', displayName: 'City' }],
    },
    values: {
      expandable: true,
      selectable: true,
      items: [
        { id: 'people-group-a', displayName: 'People Group A'  },
        { id: 'people-group-b', displayName: 'People Group B' },
        { id: 'people-group-delta', displayName: 'People Group Delta' },
      ],
    },
  };
// , children: [{ id: 'price-ac' }, { id: 'price-rc' }]
  function generateSwitcherFields(updatedResult: any) {
    const values = updatedResult.values.items.reduce((result: any, item: any) => {
      if (defaultSwitcherFields.values.items.find((i) => i.id === item.id)) {
        result.push(item);
      } else {
        const parent = result[result.length - 1];
        parent.children = parent.children ? parent.children : [];
        parent.children.push(item);
      }
      return result;
    }, []);

    return {
      rows: { items: updatedResult.rows.items },
      columns: { items: updatedResult.columns.items },
      values: {
        selectable: true,
        expandable: true,
        items: values,
      },
    };
  }

  function generateFields(updatedResult: any) {
    return {
      rows: updatedResult.rows.items.map((i: any) => i.id),
      columns: updatedResult.columns.items.map((i: any) => i.id),
      values: updatedResult.values.items
        .filter(
          (i: any) =>
            !updatedResult.values.hideItems.find((hide: any) => hide.id === i.id),
        )
        .map((i:any) => i.id),
      valueInCols: true,
    };
  }
  const [fields, setFields] = useState(s2DataConfig.fields);
  const [switcherFields, setSwitcherFields] = useState(
    defaultSwitcherFields,
  );

  const onSubmit = (result: any) => {
    setFields(generateFields(result));
    setSwitcherFields(generateSwitcherFields(result));
  };

  return  <div className={'px-10'}>
    <Switcher {...switcherFields} onSubmit={onSubmit} />
    <SheetComponent
      dataCfg={{...dataCfg, fields}}
      options={s2Options}
      sheetType="pivot"
      themeCfg={{ theme }}
      showPagination
      adaptive={{
        width: true,
        height: false,
      }}
      header={{
        advancedSortCfg: {
          open: true,
          sortParams,
          onSortConfirm: (ruleValues, sortParams) => {
            setDataCfg({ ...dataCfg, sortParams });
            setSortParams(sortParams);
          },
        },
      }}
    />
  </div>;
};
const data = [
  {
    "type": "Have a credit card",
    "job": "White collar",
    "age": "Under 20 years old",
    "city": "First and second tier cities",
    "people-group-a": 99.56,
    "people-group-b": 96,
    "people-group-delta": 76.32
  },
  {
    "type": "Have a credit card",
    "job": "White collar",
    "age": "Under 20 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 82.5,
    "people-group-b": 59.56,
    "people-group-delta": 86.32
  },
  {
    "type": "Have a credit card",
    "job": "White collar",
    "age": "20 to 40 years old",
    "city": "First and second cities",
    "people-group-a": 99.26,
    "people-group-b": 99.56,
    "people-group-delta": 16.32
  },
  {
    "type": "Have a credit card",
    "job": "White collar",
    "age": "20 to 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 49.5,
    "people-group-b": 59.6,
    "people-group-delta": 16.32
  },
  {
    "type": "Have a credit card",
    "job": "White collar",
    "age": "Over 40 years old",
    "city": "First and second cities",
    "people-group-a": 29.5,
    "people-group-b": 49.5,
    "people-group-delta": 26.3
  },
  {
    "type": "Have a credit card",
    "job": "White collar",
    "age": "Over 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 40.5,
    "people-group-b": 55.5,
    "people-group-delta": 36.32
  },
  {
    "type": "Have a credit card",
    "job": "Blue collar",
    "age": "Under 20 years old",
    "city": "First and second tier cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 46.32
  },
  {
    "type": "Have a credit card",
    "job": "Blue collar",
    "age": "Under 20 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 76,
    "people-group-b": 69.6,
    "people-group-delta": 66
  },
  {
    "type": "Have a credit card",
    "job": "Blue collar",
    "age": "20 to 40 years old",
    "city": "First and second cities",
    "people-group-a": 89.6,
    "people-group-b": 88,
    "people-group-delta": 52
  },
  {
    "type": "Have a credit card",
    "job": "Blue collar",
    "age": "20 to 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 96.32
  },
  {
    "type": "Have a credit card",
    "job": "Blue collar",
    "age": "Over 40 years old",
    "city": "First and second cities",
    "people-group-a": 92.6,
    "people-group-b": 96.6,
    "people-group-delta": 94.32
  },
  {
    "type": "Have a credit card",
    "job": "Blue collar",
    "age": "Over 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 16,
    "people-group-b": 16,
    "people-group-delta": -26.3
  },
  {
    "type": "Have a credit card",
    "job": "Student",
    "age": "Under 20 years old",
    "city": "First and second tier cities",
    "people-group-a": 20,
    "people-group-b": 20.5,
    "people-group-delta": -16
  },
  {
    "type": "Have a credit card",
    "job": "Student",
    "age": "Under 20 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 7.6,
    "people-group-b": 9.5,
    "people-group-delta": 6
  },
  {
    "type": "Have a credit card",
    "job": "Student",
    "age": "20 to 40 years old",
    "city": "First and second cities",
    "people-group-a": 20,
    "people-group-b": 25.56,
    "people-group-delta": 0
  },
  {
    "type": "Have a credit card",
    "job": "Student",
    "age": "20 to 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 29.5,
    "people-group-b": 49.5,
    "people-group-delta": 17.2
  },
  {
    "type": "Have a credit card",
    "job": "Student",
    "age": "Over 40 years old",
    "city": "First and second cities",
    "people-group-a": 99.56,
    "people-group-b": 89.56,
    "people-group-delta": 66.32
  },
  {
    "type": "Have a credit card",
    "job": "Student",
    "age": "Over 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 35.5,
    "people-group-b": 36.6,
    "people-group-delta": 36.2
  },
  {
    "type": "Have a credit card",
    "job": "Other",
    "age": "Under 20 years old",
    "city": "First and second tier cities",
    "people-group-a": 5,
    "people-group-b": 4.56,
    "people-group-delta": 4.32
  },
  {
    "type": "Have a credit card",
    "job": "Other",
    "age": "Under 20 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 42.56,
    "people-group-b": 46.56,
    "people-group-delta": 40.3
  },
  {
    "type": "Have a credit card",
    "job": "Other",
    "age": "20 to 40 years old",
    "city": "First and second cities",
    "people-group-a": 29.6,
    "people-group-b": 35.5,
    "people-group-delta": 26.3
  },
  {
    "type": "Have a credit card",
    "job": "Other",
    "age": "20 to 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 5.5,
    "people-group-b": 10,
    "people-group-delta": -16.5
  },
  {
    "type": "Have a credit card",
    "job": "Other",
    "age": "Over 40 years old",
    "city": "First and second cities",
    "people-group-a": 92.5,
    "people-group-b": 94.6,
    "people-group-delta": 56.2
  },
  {
    "type": "Have a credit card",
    "job": "Other",
    "age": "Over 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 45,
    "people-group-b": 54,
    "people-group-delta": 36.3
  },
  {
    "type": "No credit card",
    "job": "White collar",
    "age": "Under 20 years old",
    "city": "First and second tier cities",
    "people-group-a": 56.5,
    "people-group-b": 60.5,
    "people-group-delta": 86.32
  },
  {
    "type": "No credit card",
    "job": "White collar",
    "age": "Under 20 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 95,
    "people-group-b": 95,
    "people-group-delta": 76
  },
  {
    "type": "No credit card",
    "job": "White collar",
    "age": "20 to 40 years old",
    "city": "First and second cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 76.32
  },
  {
    "type": "No credit card",
    "job": "White collar",
    "age": "20 to 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 24.56,
    "people-group-b": 28.5,
    "people-group-delta": 26.2
  },
  {
    "type": "No credit card",
    "job": "White collar",
    "age": "Over 40 years old",
    "city": "First and second cities",
    "people-group-a": 69.56,
    "people-group-b": 69.56,
    "people-group-delta": 66.32
  },
  {
    "type": "No credit card",
    "job": "White collar",
    "age": "Over 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 78.56,
    "people-group-b": 75.5,
    "people-group-delta": 76.32
  },
  {
    "type": "No credit card",
    "job": "Blue collar",
    "age": "Under 20 years old",
    "city": "First and second tier cities",
    "people-group-a": 89.6,
    "people-group-b": 80.56,
    "people-group-delta": 83.3
  },
  {
    "type": "No credit card",
    "job": "Blue collar",
    "age": "Under 20 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 76.32
  },
  {
    "type": "No credit card",
    "job": "Blue collar",
    "age": "20 to 40 years old",
    "city": "First and second cities",
    "people-group-a": 5.5,
    "people-group-b": 3,
    "people-group-delta": -28
  },
  {
    "type": "No credit card",
    "job": "Blue collar",
    "age": "20 to 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 5.56,
    "people-group-b": 6.56,
    "people-group-delta": 7.32
  },
  {
    "type": "No credit card",
    "job": "Blue collar",
    "age": "Over 40 years old",
    "city": "First and second cities",
    "people-group-a": 33.6,
    "people-group-b": 32.5,
    "people-group-delta": 30
  },
  {
    "type": "No credit card",
    "job": "Blue collar",
    "age": "Over 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 0,
    "people-group-b": 9.6,
    "people-group-delta": 6.5
  },
  {
    "type": "No credit card",
    "job": "Student",
    "age": "Under 20 years old",
    "city": "First and second tier cities",
    "people-group-a": 24.5,
    "people-group-b": 24.6,
    "people-group-delta": 25
  },
  {
    "type": "No credit card",
    "job": "Student",
    "age": "Under 20 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 34.56,
    "people-group-b": 36.6,
    "people-group-delta": 40.2
  },
  {
    "type": "No credit card",
    "job": "Student",
    "age": "20 to 40 years old",
    "city": "First and second cities",
    "people-group-a": 32.5,
    "people-group-b": 36.5,
    "people-group-delta": 45
  },
  {
    "type": "No credit card",
    "job": "Student",
    "age": "20 to 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 76.32
  },
  {
    "type": "No credit card",
    "job": "Student",
    "age": "Over 40 years old",
    "city": "First and second cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 76.32
  },
  {
    "type": "No credit card",
    "job": "Student",
    "age": "Over 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 5,
    "people-group-b": 10,
    "people-group-delta": -2.2
  },
  {
    "type": "No credit card",
    "job": "Other",
    "age": "Under 20 years old",
    "city": "First and second tier cities",
    "people-group-a": 68.6,
    "people-group-b": 69.6,
    "people-group-delta": 69.3
  },
  {
    "type": "No credit card",
    "job": "Other",
    "age": "Under 20 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 87.56,
    "people-group-b": 88.56,
    "people-group-delta": 86.32
  },
  {
    "type": "No credit card",
    "job": "Other",
    "age": "20 to 40 years old",
    "city": "First and second cities",
    "people-group-a": 92.56,
    "people-group-b": 95.56,
    "people-group-delta": 96.32
  },
  {
    "type": "No credit card",
    "job": "Other",
    "age": "20 to 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 76.32
  },
  {
    "type": "No credit card",
    "job": "Other",
    "age": "Over 40 years old",
    "city": "First and second cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 76.32
  },
  {
    "type": "No credit card",
    "job": "Other",
    "age": "Over 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 9.6,
    "people-group-b": 9.8,
    "people-group-delta": -6.2
  },
  {
    "type": "Other",
    "job": "White collar",
    "age": "Under 20 years old",
    "city": "First and second tier cities",
    "people-group-a": 21.56,
    "people-group-b": 25.56,
    "people-group-delta": 26.32
  },
  {
    "type": "Other",
    "job": "White collar",
    "age": "Under 20 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 76.32
  },
  {
    "type": "Other",
    "job": "White collar",
    "age": "20 to 40 years old",
    "city": "First and second cities",
    "people-group-a": 12.56,
    "people-group-b": 15.6,
    "people-group-delta": 16.2
  },
  {
    "type": "Other",
    "job": "White collar",
    "age": "20 to 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 25.5,
    "people-group-b": 20.6,
    "people-group-delta": -30.2
  },
  {
    "type": "Other",
    "job": "White collar",
    "age": "Over 40 years old",
    "city": "First and second cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 76.32
  },
  {
    "type": "Other",
    "job": "White collar",
    "age": "Over 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 42.56,
    "people-group-b": 42.56,
    "people-group-delta": 42.32
  },
  {
    "type": "Other",
    "job": "Blue collar",
    "age": "Under 20 years old",
    "city": "First and second tier cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 76.32
  },
  {
    "type": "Other",
    "job": "Blue collar",
    "age": "Under 20 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 56.56,
    "people-group-b": 56.56,
    "people-group-delta": 66.32
  },
  {
    "type": "Other",
    "job": "Blue collar",
    "age": "20 to 40 years old",
    "city": "First and second cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 76.32
  },
  {
    "type": "Other",
    "job": "Blue collar",
    "age": "20 to 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 5.56,
    "people-group-b": 0.5,
    "people-group-delta": -56
  },
  {
    "type": "Other",
    "job": "Blue collar",
    "age": "Over 40 years old",
    "city": "First and second cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 76.32
  },
  {
    "type": "Other",
    "job": "Blue collar",
    "age": "Over 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 70.56,
    "people-group-b": 78.56,
    "people-group-delta": 72.2
  },
  {
    "type": "Other",
    "job": "Student",
    "age": "Under 20 years old",
    "city": "First and second tier cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 76.32
  },
  {
    "type": "Other",
    "job": "Student",
    "age": "Under 20 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 10.5,
    "people-group-b": 20.56,
    "people-group-delta": -42.32
  },
  {
    "type": "Other",
    "job": "Student",
    "age": "20 to 40 years old",
    "city": "First and second cities",
    "people-group-a": 30,
    "people-group-b": 35,
    "people-group-delta": -40
  },
  {
    "type": "Other",
    "job": "Student",
    "age": "20 to 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 76.32
  },
  {
    "type": "Other",
    "job": "Student",
    "age": "Over 40 years old",
    "city": "First and second cities",
    "people-group-a": 34.6,
    "people-group-b": 22.5,
    "people-group-delta": 25.5
  },
  {
    "type": "Other",
    "job": "Student",
    "age": "Over 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 99.56,
    "people-group-b": 99.56,
    "people-group-delta": 76.32
  },
  {
    "type": "Other",
    "job": "Other",
    "age": "Under 20 years old",
    "city": "First and second tier cities",
    "people-group-a": 10.6,
    "people-group-b": 9.5,
    "people-group-delta": -50.2
  },
  {
    "type": "Other",
    "job": "Other",
    "age": "Under 20 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 45.5,
    "people-group-b": 40.5,
    "people-group-delta": 46.2
  },
  {
    "type": "Other",
    "job": "Other",
    "age": "20 to 40 years old",
    "city": "First and second cities",
    "people-group-a": 78.6,
    "people-group-b": 88.5,
    "people-group-delta": 66.2
  },
  {
    "type": "Other",
    "job": "Other",
    "age": "20 to 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 50.5,
    "people-group-b": 45,
    "people-group-delta": 36.3
  },
  {
    "type": "Other",
    "job": "Other",
    "age": "Over 40 years old",
    "city": "First and second cities",
    "people-group-a": 90.56,
    "people-group-b": 94.56,
    "people-group-delta": 16.2
  },
  {
    "type": "Other",
    "job": "Other",
    "age": "Over 40 years old",
    "city": "Third and fourth tier cities",
    "people-group-a": 45.6,
    "people-group-b": 34.6,
    "people-group-delta": 46.2
  }
];
export default Page;
