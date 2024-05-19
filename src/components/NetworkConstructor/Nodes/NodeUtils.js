import {useVueFlow} from "@vue-flow/core";

export const nodeStatuses = {
    "requestRoutingTable": {
        img: "/gif/loading.gif",
        text: "RIP запрос",
        package: {
            "Команда": {size: 1, value: "Запрос"},
            "Версия": {size: 1, value: 1},
            "Идентификатор": {size: 2, value: 0},
        }
    },
    "packageDelivery": {
        img: "/gif/packageDelivery.gif",
        text: "IP пакет"
    },
    "successfulDelivery": {
        img: "/gif/successfulDelivery.gif",
        text: "Пакет доставлен"
    }
}

export function sendPackage() {
    let destination = null;
    let startNode = null;
    const {findEdge} = useVueFlow();

    function start(ip, node) {
        destination = ip;
        startNode = node;
        startNode.data.sendingPackage = true;
        processDelivery(startNode);
    }

    function processDelivery(fromNode) {
        if (fromNode) {
            const edge = findEdge(fromNode.data.table[destination]?.edge);
            if (edge) {
                const toNode = fromNode.id === edge.targetNode.id ? edge.sourceNode : edge.targetNode;
                const animation = fromNode.id === edge.targetNode.id ? 'packageToSource' : 'packageToTarget';

                const tryToStartDelivery = setInterval(() => {
                    if (!edge.data.animation[animation]) {
                        clearInterval(tryToStartDelivery);
                        fromNode.data.status.packageDelivery.enabled = true;
                        edge.data.animation[animation] = true
                        setTimeout(() => {
                            fromNode.data.status.packageDelivery.enabled = false;
                            if (toNode) {
                                if (toNode.data.ip === destination) {
                                    startNode.data.sendingPackage = false;
                                    startNode.data.status.successfulDelivery.enabled = true;
                                    setTimeout(() =>
                                            startNode.data.status.successfulDelivery.enabled = false,
                                        2000);
                                } else
                                    processDelivery(toNode);
                            }
                        }, 2000);
                    }
                }, 1000);
            } else {
                startNode.data.sendingPackage = false;
                //fromNode.data.status = {value: "errorSendingPackage", data: {error: "gatewayNotFound"}};
            }

        }
    }

    return {start};
}

export function useRIPv1Timeout(connectedEdges, nodeId, nodeData) {
    let isRIPv1Enabled = false;
    let timer = null;

    function getTime() {
        return Math.floor(Math.random() * (60 - 50) + 50) * 100;
    }

    function start() {
        isRIPv1Enabled = true;
        timer = setTimeout(() => {
            RIPv1(connectedEdges.value, nodeId, nodeData)
        }, getTime());
    }

    function scheduleNewRequest() {
        if (isRIPv1Enabled)
            timer = setTimeout(() => {
                RIPv1(connectedEdges.value, nodeId, nodeData)
            }, getTime());
    }

    function stop() {
        isRIPv1Enabled = false;
        clearTimeout(timer);
    }

    function state() {
        return isRIPv1Enabled;
    }

    function RIPv1(connectedEdges, nodeId, reqNodeData) {
        reqNodeData.status.requestRoutingTable.enabled = true;

        const incomingChanges = {}; // Изменения в таблице

        for (const edge of connectedEdges) {
            const {id: edgeId, targetNode, sourceNode, data: edgeData} = edge;

            const {data: resNodeData, type: resNodeType} = targetNode.id === nodeId ? sourceNode : targetNode;

            if (!(resNodeType === 'computer' && !resNodeData.props?.routerMode?.enabled && reqNodeData.props?.routerMode)) {

                Object.entries(resNodeData.table).forEach(([destIp, resEntry]) => {
                    if (resEntry.gateway !== reqNodeData.ip) {
                        const existEntry = incomingChanges[destIp] || reqNodeData.table[destIp];
                        if (existEntry && existEntry.hops > resEntry.hops + 1 || !existEntry)
                            incomingChanges[destIp] = {
                                gateway: resNodeData.ip,
                                edge: edgeId,
                                lifeCycle: 6,
                                hops: resEntry.hops + 1
                            };
                        else
                            incomingChanges[destIp] = 'updateLifeCycle';
                    }
                })

                edgeData.animation[nodeId === targetNode.id ? 'tableToTarget' : 'tableToSource'] = true;
            }
        }

        if (Object.keys(incomingChanges).length !== 0) {
            Object.entries(incomingChanges).map(([destIp, entry]) => {
                if (entry === 'updateLifeCycle')
                    reqNodeData.table[destIp].lifeCycle = 6;
                else
                    reqNodeData.table[destIp] = entry;
            })

        }

        Object.keys(reqNodeData.table).forEach((key) => {
            if (!incomingChanges.hasOwnProperty(key))
                if (--reqNodeData.table[key].lifeCycle === 0)
                    delete reqNodeData.table[key];
        })
        sortRoutingTableByHops(reqNodeData);

        setTimeout(() => reqNodeData.status.requestRoutingTable.enabled = false, 2000);

        scheduleNewRequest();
    }

    return {start, stop, state};
}

export function sortRoutingTableByHops(nodeData) {
    nodeData.table = Object.entries(nodeData.table) // преобразовать в массив
        .sort((a, b) => a[1].hops - b[1].hops) // сортировка по значению свойства hops
        .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
}