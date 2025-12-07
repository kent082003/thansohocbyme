function downloadPDF() {
    const element = document.getElementById('pdf-content');

    const opt = {
        margin: 0.4,
        filename: 'than_so_hoc.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}
