<div class="page-box">
    <div class="printable">
        <div style="height: 5%; border: 1px solid black">
            <div style="margin: -1mm; width: 100%; height:100%; border 1px solid black">
                <div class = info-div style="width: 40%;">
                    <div class ="write-in" style="width: 95%; min-height: 50%"></div>
                    Name
                </div>
                
            </div>

        </div>
        <div style="height: 5%; border: 1px solid black">middle bar</div>
        <div style="height: 90%; border: 1px solid black">bottom bar</div>
        
    </div>
    <div class="printable">
        glaggle
    </div>
    <div class="printable">
        glaggle
    </div>
    <div class="printable">
        glaggle
    </div>
</div>


<style>
@media print {
    body{
        margin:0;
        padding:0;   
    }

    @page {
        height: 300mm;
        width: 210mm;
        margin: 0 !important;
        padding: 0 !important;
        color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
        background-color: white;
    }

    .printable {
        /* zoom: 75%; */
        width: 100% !important;
        height: 300mm !important;
        color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
        border: 0mm solid black !important;
        box-sizing:content-box !important;
        page-break-after: page !important;
    }
    .page-box{
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0 !important;
        left: 0 !important;
        width: 210mm !important;
        height: 1188mm !important;
    }

}


    .printable {
        display: flex;
        flex-direction: column;
        /* zoom: 75%; */
        width: 100% !important;
        height: 300mm !important;
        color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
        border: 1mm solid black;
        box-sizing:content-box !important;
        page-break-after: page !important;
    }

    .printable div{
        margin: 1mm;

    }
    .page-box{
        display: flex;
        flex-direction: column;
        position: absolute;
        align-items: center;
        justify-content: center;
        top: 20px;
        left: 25%;
        width: 210mm;
        height: 1188mm;
    }

    .info-div{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 80%;
        margin: 0mm !important;
        font-size: small;
    }
    .write-in{
        border: 1mm solid black;
    }
</style>