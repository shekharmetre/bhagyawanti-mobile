import { RepairHero, SelectRepair } from "@/components/reapair";
import { RepairInfoSection } from "@/components/reapair/repairInfo";

export default function Repair() {
  return (
    <section>
      <RepairHero />
      <div className="grid lg:grid-cols-2 grid-cols-1 md:mx-20 md:m-auto">
        <SelectRepair />
          <RepairInfoSection />
      </div>
    </section>
  );
}
