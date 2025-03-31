export function Selector({options}) {
    const $selector = document.createElement("select");

    options.forEach((option) => {
        const $option = document.createElement("option");
        $option.value = option;
        $option.textContent = option;
        $selector.appendChild($option);
    });

    return $selector;
}