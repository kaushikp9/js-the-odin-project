import restaurantImage from '../food-js-odin.png'
export const homepage = () => {
    const content = document.getElementById('content')
    content.innerHTML = `<img src="${restaurantImage}" alt="Delizioso Restaurant Interior" width="600" height="400">`
}