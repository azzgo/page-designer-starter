import { cloneDeep } from "lodash-es";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import Sortable, { SortableEvent } from "sortablejs";
import { IComposition } from "src/type";

export interface ISelectPanelProps {
  compositionList: IComposition[]
}

function SelectPanel({ compositionList = [] }: ISelectPanelProps) {
  const dragZone = useRef(null);

  useEffect(() => {
    const sortable = new Sortable(dragZone.current, {
      group: { name: "low-code", pull: "clone", put: false },
      sort: false,
      onClone(event: SortableEvent) {
        const index = Array.prototype.slice
          .call(dragZone.current.childNodes)
          .indexOf(event.item);
        const compositionData = compositionList[index];

        (event.item as any)._dragData = cloneDeep({
          ...compositionData.schema,
          key: compositionData.key,
          id: nanoid(10),
        });
      },
    });

    return () => sortable.destroy();
  }, [compositionList]);

  return (
    <div ref={dragZone} className="two columns select-panel">
      {compositionList.map((composition) => (
        <p className="drag-item" key={composition.name}>
          {composition.name}
        </p>
      ))}
    </div>
  );
}

export default SelectPanel;
