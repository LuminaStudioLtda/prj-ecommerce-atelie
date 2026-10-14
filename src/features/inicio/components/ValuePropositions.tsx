import { MaterialIcon } from "@/components/MaterialIcon";
import { VALUE_PROPOSITIONS } from "@/features/inicio/constants";

export function ValuePropositions() {
  return (
    <section className="w-full bg-surface-container-lowest py-space-lg shadow-sm">
      <div className="mx-auto max-w-7xl px-margin">
        <div className="grid grid-cols-2 gap-space-lg md:grid-cols-4">
          {VALUE_PROPOSITIONS.map(({ icon, iconClass, title, description }) => (
            <div key={title} className="flex items-center gap-space-sm">
              <div className={`flex size-12 shrink-0 items-center justify-center rounded-[0.75rem] bg-surface-container-low shadow-sm ${iconClass}`}>
                <MaterialIcon name={icon} className="text-[24px]" />
              </div>
              <div>
                <h4 className="text-label-md font-semibold text-on-surface">{title}</h4>
                <p className="text-body-sm text-outline">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
