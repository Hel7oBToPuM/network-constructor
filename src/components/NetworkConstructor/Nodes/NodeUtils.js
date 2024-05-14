import {watchEffect} from "vue";

export function watchNewConnections(connectedEdges, nodeId, nodeData) {
    // Обновление базовой таблицы маршруртизации по прямым подключениям
    watchEffect(() => {
        if (connectedEdges && connectedEdges.value.length > 0) {
            // Создание новой таблицы маршуртизации прямых подключений
            const newTable = {};
            for (const edge of connectedEdges.value) {
                const {id, targetNode, sourceNode} = edge;
                if (targetNode.id === nodeId)
                    newTable[sourceNode.data.ip] = {gateway: sourceNode.data.ip, edge: id, hops: 1};
                else if (sourceNode.id === nodeId)
                    newTable[targetNode.data.ip] = {gateway: targetNode.data.ip, edge: id, hops: 1};
            }
            // По разнице между таблицами обновляется старая
            if (Object.keys(nodeData.table).length === 0)
                nodeData.table = newTable;
            else {
                const oldGateways = Object.keys(nodeData.table).map(key => nodeData.table[key].gateway);
                const newGateways = Object.keys(newTable).map(key => newTable[key].gateway);

                for (const key in nodeData.table)
                    if (!newGateways.includes(nodeData.table[key].gateway))
                        delete nodeData.table[key];

                for (const key in newTable)
                    if (!oldGateways.includes(newTable[key].gateway))
                        nodeData.table[key] = newTable[key];
            }
        } else
            for (const key in nodeData.table)
                if (nodeData.table.hasOwnProperty(key))
                    delete nodeData.table[key];
    })
}