import { Csv } from "../domain/entity/Csv.js";

export function CsvLoader(onRead) {
    const $dropZone = document.createElement("div");

    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
        $dropZone.addEventListener(eventName, (e) => e.preventDefault());
        $dropZone.addEventListener(eventName, (e) => e.stopPropagation());
    });

    ["dragenter", "dragover"].forEach(eventName => {
        $dropZone.addEventListener(eventName, () => $dropZone.classList.add("highlight"));
    });

    ["dragleave", "drop"].forEach(eventName => {
        $dropZone.addEventListener(eventName, () => $dropZone.classList.remove("highlight"));
    });

    $dropZone.addEventListener("drop", (e) => {
        const file = e.dataTransfer.files[0];

        if (file && file.type === "text/csv") {
            const reader = new FileReader();

            reader.onload = (event) => {
                const text = new Csv(event.target.result, ";");
                onRead(text);
            };

            reader.readAsText(file);
        }
    });

    return $dropZone;
} 