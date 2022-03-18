import { useMemo, useState } from 'react';
import { useOrder } from '../../context';
import { getMoneyString } from '../../utils';
import styles from './TipBox.module.scss';

interface ITipBoxProps {
  subTotal: number;
}

export const TipBox = ({ subTotal }: ITipBoxProps) => {
  const [customTipAmount, setCustomTipAmount] = useState<number>();
  const tipOptions = useMemo(
    () => ({
      18: Math.round(subTotal * 0.18),
      20: Math.round(subTotal * 0.2),
      25: Math.round(subTotal * 0.25),
    }),
    [subTotal]
  );

  const { setTipMoney, tipMoney } = useOrder();

  const tipOptionSelected = (tipAmount: number) => {
    setTipMoney({ currency: 'USD', amount: tipAmount } as any);
    setCustomTipAmount(undefined);
  };

  const customTipChanged = (e: any) => {
    setTipMoney({
      currency: 'USD',
      amount: +e.target.value.replace('.', ''),
    } as any);
    setCustomTipAmount(+e.target.value);
  };

  return (
    <>
      <div className={styles.tipBoxWrap}>
        <div
          className={`${styles.tipOptionWrap}${
            //@ts-ignore
            tipMoney.amount === tipOptions[18] ? ` ${styles.selected}` : ''
          }`}
          onClick={() => tipOptionSelected(tipOptions[18])}
        >
          <span className={styles.tipPct}>18%</span>
          <span className={styles.totalTip}>
            {getMoneyString(tipOptions[18])}
          </span>
        </div>
        <div
          className={`${styles.tipOptionWrap}${
            //@ts-ignore
            tipMoney.amount === tipOptions[20] ? ` ${styles.selected}` : ''
          }`}
          onClick={() => tipOptionSelected(tipOptions[20])}
        >
          <span className={styles.tipPct}>20%</span>
          <span className={styles.totalTip}>
            {getMoneyString(tipOptions[20])}
          </span>
        </div>
        <div
          className={`${styles.tipOptionWrap}${
            //@ts-ignore
            tipMoney.amount === tipOptions[25] ? ` ${styles.selected}` : ''
          }`}
          onClick={() => tipOptionSelected(tipOptions[25])}
        >
          <span className={styles.tipPct}>25%</span>
          <span className={styles.totalTip}>
            {getMoneyString(tipOptions[25])}
          </span>
        </div>
      </div>
      <div className={styles.inputWrap}>
        <input
          type="number"
          min="0"
          placeholder="Custom Tip Amount"
          value={customTipAmount || ''}
          onChange={customTipChanged}
        />
      </div>
    </>
  );
};
