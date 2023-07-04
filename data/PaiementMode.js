export const paiementModeData = [
    {
        label: 'Paiement cash à la livraison',
        value: 'deliver',
        images: [
            require("../assets/deliver.png"),
        ]
    },
    {
        label: 'Paiement par Mobile Money',
        value: 'mobile-money',
        images: [
            require("../assets/orange.png"),
            require("../assets/momo.png"),
            require("../assets/moov.png"),
            require("../assets/wave.jpeg"),
        ]
    },
    {
        label: 'Paiement par carte bancaire',
        value: 'bank-cart',
        images: [
            require("../assets/master.png"),
            require("../assets/visa.jpg"),
            require("../assets/paypal.png"),
        ]
    }
]

export const findPaimentMode = (item) => {
    return paiementModeData.find(mode => mode.value === item)
}
