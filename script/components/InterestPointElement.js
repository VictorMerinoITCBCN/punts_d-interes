export const InterestPointElement = (interestPoint) => {
    const $interestPoint = document.createElement("div");
    $interestPoint.className = "interest-point " + interestPoint.type;

    const $h2 = document.createElement("h2");
    $h2.textContent = interestPoint.name;
    $interestPoint.appendChild($h2);

    const $span = document.createElement("span");
    $span.textContent = `${interestPoint.city} | Tipus: ${interestPoint.type}`;

    if (interestPoint.schedules) $span.textContent += ` | Horaris: ${interestPoint.schedules}`;

    if (interestPoint.price) $span.textContent += ` | Preu ${interestPoint.price}`;
    $interestPoint.appendChild($span);

    return $interestPoint;
}