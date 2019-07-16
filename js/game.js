const $openMarket = document.getElementById('openMarket')
const $openInventory = document.getElementById('openInventory')

const $market = document.getElementById("market")
const $vendorName = document.getElementById("vendorName")
const $vendorPortrait = document.getElementById('vendorPortrait')
const $vendorInventory = document.getElementById("vendorInventory")
const $buy = document.getElementById('buy')
const $sell = document.getElementById('sell')

const $playerScreen = document.getElementById('playerScreen')
const $playerName = document.getElementById('playerName')
const $playerInventory = document.getElementById('playerInventory')
const $money = document.getElementById('money')
const $playerGold = document.getElementById("gold")


const player = {
    name: "Stephen",
    gold: 50,
    inventory: [{
            name: "Wood",
            price: 7,
            quantity: 9
        },
        {
            name: "Grain",
            price: 15,
            quantity: 4
        },
        {
            name: "Cloth",
            price: 8,
            quantity: 5
        }

    ]
}

const vendors = [{
        id: 0,
        name: "Tony",
        modifier: 0.75,
        inventory: [{
                name: "Wood",
                price: 5,
                quantity: 5
            },
            {
                name: "Grain",
                price: 10,
                quantity: 6
            },
            {
                name: "Cloth",
                price: 8,
                quantity: 0
            }
        ]
    },
    {
        id: 1,
        name: "Charles",
        modifier: 1.25,
        inventory: [{
                name: "Wood",
                price: 7,
                quantity: 9
            },
            {
                name: "Grain",
                price: 15,
                quantity: 4
            },
            {
                name: "Cloth",
                price: 8,
                quantity: 5
            }

        ]
    }
]
let activeVendor = vendors[0]

$buy.addEventListener('click', function () {
    populateVendorInventory(activeVendor.id)
    $buy.classList.toggle('inactive')
    $sell.classList.toggle('inactive')
})

$sell.addEventListener('click', function () {
    populateVendorInventory(100)
    $buy.classList.toggle('inactive')
    $sell.classList.toggle('inactive')
})

function openMarket() {
    $playerScreen.classList.add('hidden')
    $market.classList.remove('hidden')
    populateVendorInventory(activeVendor.id)
}

merchant1.addEventListener('click', function () {
    activeVendor = vendors[0]
    openMarket()
})

merchant2.addEventListener('click', function () {
    activeVendor = vendors[1]
    openMarket()
})

$openMarket.addEventListener('click', openMarket)

$openInventory.addEventListener('click', function () {
    populatePlayerInventory()
    $playerScreen.classList.remove('hidden')
    $market.classList.add('hidden')
})




function populateVendorInventory(vendorID) {
    $vendorInventory.innerHTML = ""
    $vendorPortrait.style.backgroundImage = `url(./img/vendors/${activeVendor.id}.png)`
    $playerGold.innerText = `Gold: ${player.gold}`
    if (vendorID === 100) {

        for (const item of player.inventory) {
            const lineItem = document.createElement('div')
            lineItem.classList.add('row')

            const itemName = document.createElement('div')
            itemName.innerText = item.name
            lineItem.appendChild(itemName)

            const itemPrice = document.createElement('div')
            itemPrice.innerText = Math.floor(item.price * activeVendor.modifier)
            lineItem.appendChild(itemPrice)

            const itemQty = document.createElement('div')
            itemQty.innerText = item.quantity
            lineItem.appendChild(itemQty)

            const btnSell = document.createElement('div')
            btnSell.classList.add("button", "sell")
            btnSell.innerText = "Sell"
            btnSell.dataset.itemIndex = player.inventory.indexOf(item)
            lineItem.appendChild(btnSell)

            $vendorInventory.appendChild(lineItem)
        }

    } else {
        const vendor = vendors[vendorID]
        $vendorName.innerText = vendor.name


        for (const item of vendor.inventory) {
            const lineItem = document.createElement('div')
            lineItem.classList.add('row')

            const itemName = document.createElement('div')
            itemName.innerText = item.name
            lineItem.appendChild(itemName)

            const itemPrice = document.createElement('div')
            itemPrice.innerText = item.price
            lineItem.appendChild(itemPrice)

            const itemQty = document.createElement('div')
            itemQty.innerText = item.quantity
            lineItem.appendChild(itemQty)


            const btnBuy = document.createElement('div')
            btnBuy.classList.add("button", "buy")
            btnBuy.innerText = "Buy"
            if (item.quantity < 1) {
                btnBuy.classList.add("inactive")
            }
            if (player.gold < item.price) {
                btnBuy.classList.add("inactive")
            }
            btnBuy.dataset.itemIndex = vendor.inventory.indexOf(item)
            lineItem.appendChild(btnBuy)

            $vendorInventory.appendChild(lineItem)

        }
        activeVendor = vendor
    }

    return activeVendor
}

function populatePlayerInventory() {
    $playerInventory.innerHTML = ""
    $playerName.innerText = player.name
    $money.innerText = `${player.gold} gold`

    for (const item of player.inventory) {
        const lineItem = document.createElement('div')
        lineItem.classList.add('row')

        const itemName = document.createElement('div')
        itemName.innerText = item.name
        lineItem.appendChild(itemName)

        const itemQty = document.createElement('div')
        itemQty.innerText = item.quantity
        lineItem.appendChild(itemQty)

        $playerInventory.appendChild(lineItem)
    }
}


$vendorInventory.addEventListener('click', function Trade(e) {
    if (e.target.classList.contains('button')) {
        if (e.target.classList.contains('buy')) {
            const item = activeVendor.inventory[e.target.dataset.itemIndex]
            if (player.gold >= item.price) {
                if (item.quantity > 0) {
                    item.quantity--
                    player.inventory[e.target.dataset.itemIndex].quantity++
                    player.gold -= item.price
                }
            }
            populateVendorInventory(activeVendor.id)
        } else if (e.target.classList.contains('sell')) {
            const item = player.inventory[e.target.dataset.itemIndex]
            if (item.quantity > 0) {
                item.quantity--
                activeVendor.inventory[e.target.dataset.itemIndex].quantity++
                player.gold += item.price
            }
            populateVendorInventory(100)
        }


    }
})

window.addEventListener('click', function (e) {
    if (e.target.classList.contains('exit')) {
        const thisWindow = e.target.closest(".popup")
        thisWindow.classList.add('hidden')
    }
})