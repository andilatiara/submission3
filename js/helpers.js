function convertDate(dateString) {
    var date = new Date(dateString);

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "December"];

    let day = String(date.getDate()).padStart(2, '0');
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear();

    let result = day + " " + month + " " + year;

    return result
}

function back() {
    window.history.back();
}
