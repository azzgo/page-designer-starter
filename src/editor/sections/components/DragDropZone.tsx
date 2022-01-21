import { useContext, useEffect, useRef, useState } from "react";
import Sortable, { SortableEvent } from "sortablejs";
import { IRenderSchemaFn, ISchema } from "src/type";
import { EditorStoreContext } from "../../store";

// copy from vuedraggable source code
function insertNodeAt(fatherNode: ParentNode, node: Node, position: number) {
  const refNode =
    position === 0
      ? fatherNode.children[0]
      : fatherNode.children[position - 1].nextSibling;
  fatherNode.insertBefore(node, refNode);
}

export interface IDragDropZoneProps {
  render: IRenderSchemaFn;
  schema: ISchema[];
}

export interface IDragDropItemProps {
  render: IRenderSchemaFn;
  schema: ISchema;
}

function DragDropZone({ render, schema }: IDragDropZoneProps) {
  const dragDropRef = useRef(null);
  const [, forceUpdate] = useState({});
  const eventBus = useContext(EditorStoreContext);

  useEffect(() => {
    const sortable = new Sortable(dragDropRef.current, {
      group: { name: "low-code", pull: true, put: true },
      sort: true,
      onAdd(event: SortableEvent) {
        event.item.remove();
        schema.splice(event.newIndex, 0, (event.item as any)._dragData);
        eventBus.setActiveWidgetId((event.item as any)._dragData.id);
        forceUpdate({});
      },
      onUpdate(event: SortableEvent) {
        event.item.remove();
        insertNodeAt(event.from, event.item, event.oldIndex);
        schema.splice(event.newIndex, 0, schema.splice(event.oldIndex, 1)[0]);
        forceUpdate({});
      },
      onRemove(event: SortableEvent) {
        // must keep a dom on origin position then change data。
        insertNodeAt(dragDropRef.current, event.item, event.oldIndex);
        schema.splice(event.oldIndex, 1);
        forceUpdate({});
      },
      onStart(event: SortableEvent) {
        const index = Array.prototype.slice
          .call(dragDropRef.current.childNodes)
          .indexOf(event.item);
        const _dragSchema = schema[index];
        (event.item as any)._dragData = _dragSchema;
      },
    });
    return () => sortable.destroy();
  }, [schema, eventBus]);

  return (
    <div className="drag-drop-zone" ref={dragDropRef}>
      {schema.map((_schema: ISchema) => {
        return (
          <DragDropItem key={_schema.id} schema={_schema} render={render} />
        );
      })}
    </div>
  );
}

function DragDropItem({ schema, render }: IDragDropItemProps) {
  const eventBus = useContext(EditorStoreContext);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    return eventBus.onWidgetSchemaChange(schema.id, (newSchema: ISchema) => {
      Object.assign(schema, newSchema);
      forceUpdate({});
    });
  }, [eventBus, schema]);

  return (
    <div
      className="drag-drop-item"
      key={schema.id}
      onClick={(event) => {
        event.stopPropagation();
        eventBus.setActiveWidgetId(schema.id);
      }}
    >
      {render(schema)}
    </div>
  );
}

export default DragDropZone;
