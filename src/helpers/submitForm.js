export default async function submitForm(url, data) {
    const response = await fetch(url, {
        method: "POST",
        body: data
    });

    if (!response.ok) throw new Error("Не удалось отправить форму");
    return await response.json();
}