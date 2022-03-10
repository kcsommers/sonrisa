import { getMoneyString } from '@core';
import { useMemo, useState } from 'react';
import { consoleTestResultsHandler } from 'tslint/lib/test';
import styles from './TipBox.module.scss';

interface ITipBoxProps {
  subTotal: number;
  tipChanged: (tipAmount: number) => void;
}

export const TipBox = ({ subTotal, tipChanged }: ITipBoxProps) => {
  const [customTipAmount, setCustomTipAmount] = useState<number>();
  const [tip, setTip] = useState<number>();
  const tipOptions = useMemo(
    () => ({
      15: subTotal * 0.15,
      18: subTotal * 0.18,
      20: subTotal * 0.2,
    }),
    [subTotal]
  );

  const tipOptionSelected = (amount: number) => {
    setTip(amount);
    setCustomTipAmount(undefined);
    tipChanged(amount);
  };

  return (
    <>
      <div className={styles.tipBoxWrap}>
        <div
          className={`${styles.tipOptionWrap}${
            tip === tipOptions[15] ? ` ${styles.selected}` : ''
          }`}
          onClick={() => tipOptionSelected(tipOptions[15])}
        >
          <span className={styles.tipPct}>15%</span>
          <span className={styles.totalTip}>
            {getMoneyString(tipOptions[15])}
          </span>
        </div>
        <div
          className={`${styles.tipOptionWrap}${
            tip === tipOptions[18] ? ` ${styles.selected}` : ''
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
            tip === tipOptions[20] ? ` ${styles.selected}` : ''
          }`}
          onClick={() => tipOptionSelected(tipOptions[20])}
        >
          <span className={styles.tipPct}>20%</span>
          <span className={styles.totalTip}>
            {getMoneyString(tipOptions[20])}
          </span>
        </div>
      </div>
      <div className={styles.inputWrap}>
        <input
          type="number"
          min="0"
          placeholder="Custom Tip Amount"
          value={customTipAmount || ''}
          onChange={(e) => {
            setTip(+e.target.value);
            setCustomTipAmount(+e.target.value);
            tipChanged(+e.target.value);
          }}
        />
      </div>
    </>
  );
};
