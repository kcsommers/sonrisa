'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Payment } from 'square';
import { Button } from '../../components/Button/Button';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { PickupEventDisplay } from '../../components/PickupEventDisplay/PickupEventDisplay';
import { useOrdering } from '../../context';
import { Api } from '../../sonrisa-api/api';
import styles from '../styles/OrderDetailsPage.module.scss';

function OrderDetailsContent() {
  const { clearOrder, orderingStatus } = useOrdering();
  const [payment, setPayment] = useState<Payment | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');
  const success = searchParams.get('success');

  useEffect(() => {
    if (success === 'true') {
      clearOrder();
    }
  }, [success]);

  useEffect(() => {
    if (!paymentId) return;
    (async () => {
      try {
        const res = await Api.getPayment(paymentId);
        if (res.data.errors?.length) {
          throw res.data.errors;
        }
        setPayment(res.data.payment);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [paymentId]);

  return (
    <div>
      <div className={`${styles.pageInner} responsive-container`}>
        <div className={`${styles.messageWrap}`}>
          {success === 'true' ? (
            payment && orderingStatus?.pickupEvent ? (
              <>
                <h4>Thank you!</h4>
                <h3>Your order has been placed</h3>
                <a href={payment.receiptUrl}>Click here to view your receipt</a>
                <p style={{ marginBottom: '1rem' }}>
                  Thank you for your order! You&apos;ve made me smile! I hope my
                  sonrisa brings you sonrisa &#9786;. The pickup details for
                  your order are listed below, and will be emailed to you
                  shortly.
                </p>
                <PickupEventDisplay
                  pickupEvent={orderingStatus.pickupEvent}
                  useCard={false}
                />
              </>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '2rem 0',
                }}
              >
                <LoadingSpinner />
              </div>
            )
          ) : (
            <>
              <h4>Whoops!</h4>
              <p style={{ marginBottom: '1rem' }}>
                There was a problem processing your order. Please try again.
              </p>
              <Button
                onClick={() => router.push('/checkout')}
                isFullWidth={false}
                text="Back to Checkout"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrderDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="responsive-container" style={{ padding: '4rem 0', textAlign: 'center' }}>
          Loading...
        </div>
      }
    >
      <OrderDetailsContent />
    </Suspense>
  );
}
