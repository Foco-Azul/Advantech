import PricingCard from "./PricingCard";

function PricingPlan({ plans }: any) {
  return (
    <>
      <div className="w-full flex flex-col gap-6 items-center md:flex-row md:gap-8 md:items-start md:justify-center">
        {plans.map((plan: any) => (
          <PricingCard key={plan.title} plan={plan} />
        ))}
      </div>
    </>
  );
}

export default PricingPlan;
