export const getUrl = async (url) => {
    let content = document.getElementById('content');
    content.innerHTML = `<div class="spinner-border text-theme"></div>`;
    function formatK(num) {
        return new Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(num);
    }
    try {
        const response = await fetch(`https://skizo.tech/api/tiktok?apikey=xiaoyan&url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.data?.images?.length) {
            let htmlContent = "";
            for (let x = 0; x < data.data.images.length; x++) {
                htmlContent += `<img src="${data.data.images[x]}" width="100%" height="25%"></img><br>`;
            }
            content.innerHTML = htmlContent;
        } else {
            let result = `<div class="card-body">
                <div class="d-flex align-items-center mb-3">
                    <a href="#">
                        <img src="${data.data.author.avatar}" alt="" width="50" class="rounded-circle">
                    </a>
                    <div class="flex-fill ps-2">
                        <div class="fw-bold">
                            <a href="#" class="text-decoration-none">${data.data.author.nickname}</a>
                            <a href="#" class="text-decoration-none">${data.data.author.unique_id}</a>
                        </div>
                        <div class="small text-inverse text-opacity-50">${data.data.id}</div>
                    </div>
                </div>
                <p>${data.data.title}</p>
                <div class="ratio ratio-16x9">
                    <iframe src="${data.data.play}"></iframe>
                </div>
                <hr class="mb-1">
                <div class="row text-center fw-bold">
                    <div class="col"> Like <br> ${formatK(data.data.digg_count)} </div>
                    <div class="col"> Comment <br> ${formatK(data.data.comment_count)} </div>
                    <div class="col"> Share <br> ${formatK(data.data.share_count)} </div>
                </div>
                <hr class="mb-3 mt-1">
                <div class="row text-center fw-bold">
                    <div class="col">
                        <a href="${data.data.hdplay}" type="button" class="btn btn-success btn-sm" target="_self"> HD PLAY </a>
                        <a href="${data.data.play}" type="button" class="btn btn-danger btn-sm" target="_self"> SD PLAY </a>
                        <a href="${data.data.music}" type="button" class="btn btn-warning btn-sm" target="_self"> MUSIC </a>
                    </div>
                </div>
            </div>`;
            content.innerHTML = result;
        }
    } catch (error) {
        console.error("Error fetching TikTok data:", error);
        // Handle the error, e.g., display an error message in 'content'
        content.innerHTML = `<div class="alert alert-danger alert-dismissable fade show p-3">
            <p>Error fetching TikTok data. Please try again.</p>
        </div>`;
    }
};
