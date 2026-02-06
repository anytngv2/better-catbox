// ==UserScript==
// @name 			Better Catbox
// @namespace 		https://github.com/anytngv2/better-catbox
// @supportURL 		https://github.com/anytngv2/better-catbox
// @version 		1.2.1-beta
// @description 	Improves the overall experience of the catbox site by adding some features and cleaning up the UI
// @author 			AnytngV2
// @match 			https://*.catbox.moe/*
// @icon 			https://raw.githubusercontent.com/anytngv2/better-catbox/refs/heads/main/assets/bettercatbox_square2.png
// @license 		MIT
// @compatible 		chrome
// @compatible 		edge
// @compatible 		firefox
// @compatible 		safari
// @grant 			none
// @run-at 			document-end
// @updateURL
// @downloadURL
// ==/UserScript==
(function () {
    'use strict';


    const CONFIG = {
        "customStyle": true, // if you disable this, you can found bugs
        "images": {
            "logo": {
                "light": "https://files.catbox.moe/9hbd4n.png",
                "dark": "https://files.catbox.moe/io20pj.png"
            }
        }
    }





    const isDarkMode = document.cookie.includes('darktheme=1');
    let lightMode = true;
    if (isDarkMode) lightMode = false;
    console.log("[ANTG2] Light mode is " + lightMode);

    // ? ============================
    // ? Remove gooner img at the bottom right
    // ? ============================
    const goonerImage = document.querySelector('div.image');
    if (goonerImage) goonerImage.parentNode.removeChild(goonerImage);

    // ? ============================
    // ? Remove useless note
    // ? ============================
    const notetiny = document.querySelectorAll('div.notetiny');
    if (notetiny) notetiny.forEach((element) => {
        element.parentNode.removeChild(element);
    });

    // ? ============================
    // ? Replace logo
    // ? ============================
    // search for every img thats contain in src the name "logo.png"
    const logo = document.querySelectorAll('img[src$=".png"][src*="logo"]');
    if (logo) logo.forEach((element) => {
        if (lightMode) element.src = CONFIG.images.logo.light;
        else element.src = CONFIG.images.logo.dark;
    });

    // ? ============================
    // ? Security script
    // ? ===========================

    // hide your hash value
    document.querySelectorAll("p").forEach(p => {
        p.innerHTML = p.innerHTML.replace(
            /(Your userhash is:<\/b>\s*)([a-z0-9]+)/i,
            '$1<br><span style="background:#000;color:#000;width:100%;">$2</span>'
        );
    });

    // remove email value in input#email
    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput) emailInput.value = '';

    // ? ============================
    // ? New navigation
    // ? ============================
    // check if user connected for new nav
    if (location.pathname === "/") {
        const aUser = document.querySelector('a[href="user/"]');
        if (aUser) {
            const prev = aUser.previousSibling;
            const next = aUser.nextSibling;

            if (prev && prev.nodeType === 3 && prev.textContent.trim() === "|") {
                prev.remove();
            } else if (next && next.nodeType === 3 && next.textContent.trim() === "|") {
                next.remove();
            }

            aUser.remove();

            // user nav

            const userNav = document.createElement('div');
            userNav.innerHTML = `
                <div class="linkrow" style="margin-top:10px;">
                    <a href="user/" class="linkbutton">
                        My account
                    </a>
                    |
                    <a href="user/view.php" class="linkbutton">
                        Uploads
                    </a> 
                    |
                    <a href="user/manage_albums.php" class="linkbutton">
                        Albums
                    </a>
                    |
                    <a href="user/manage.php" class="linkbutton">
                        Settings
                    </a>
                </div>
            `;

            document.querySelector('div.linkrow').after(userNav);
        }
    }





    // ? ============================
    // ? DesignRewrite
    // ? ============================
    if (CONFIG.customStyle) {
        let styleRewrite = `<style>`;

        if (lightMode) {
            styleRewrite += `
            :root{
                --primary: #da19be;
                --secondary: #ba25ff;
                --background: #fff7fe;
                --background-alt: #ffdbfb;
                --background-alt2: #ffb0f6;
                --foreground: #000;
            }
            `;
        } else {
            styleRewrite += `
                :root{
                    --primary: #da19be;
                    --secondary: #ba25ff;
                    --background: #1d1b1d;
                    --background-alt: #362f35;
                    --background-alt2: #61465e;
                    --foreground: #fff;
                }
            `;
        }

        styleRewrite += `
            body{
                background-color:var(--background);
                background-image:none !important;
            }

            a.linkbutton,
            .welcome,
            .welcomesub{
                color:var(--primary);
            }

            a.linkbutton:hover{
                color:var(--primary);
            }

            .faq h1{
                color:var(--primary);
                text-align:center;
            }

            dt,
            dt.question,
            dl dt.question{
                background:var(--background-alt);
                color:var(--secondary);
                margin-top:20px !important;
                padding: 5px 12px !important;
                border-radius:5px 5px 0 5px;
                border-bottom:1px dashed var(--primary);
            }

            dd,
            dd.answer{
                margin-top:0 !important;
                margin-bottom:1rem;
                background:var(--background-alt);
                padding:5px 12px;
                border-radius:0 0 5px 5px;
            }

            .faq > ul{
                background:var(--background-alt);
                border-radius:5px;
                padding:5px 12px;
            }

            .faq > ul > li{
                color:var(--secondary);
                text-decoration:none;
            }

            .faq > ul > ul{
                list-style:none;
                padding:5px;
                border-radius:5px;
                background:var(--background-alt);
            }

            .faq > ul > ul b{
                color:var(--primary);
            }

            .faq > ul dt{
                border-left: 1px dashed var(--primary);
                border-top: 1px dashed var(--primary);
                border-right: 1px dashed var(--primary);
                border-bottom: 0;
                border-radius:5px 5px 0 0;
            }

            .faq > ul dd{
                border-left: 1px dashed var(--primary);
                border-top: 0;
                border-right: 1px dashed var(--primary);
                border-bottom: 1px dashed var(--primary);
                margin-left:0;
                margin-bottom:0;
            }

            .hometab{
                width:10%;
                padding: 5px 12px;
                border-radius:0;
                background:var(--background-alt);
                color:var(--secondary) ;
                font-weight:bolder;
                text-align:center;
                border:1px solid var(--primary);
            }
            .hometab a{
                color:var(--secondary);
            }
            .hometab a:hover{
                color:var(--primary);
                text-decoration:none;
            }

            .legalRow{
                font-size:16px;
                text-align:center;
            }

            .legalRow span{
                margin-left: 20px;
                margin-right: 20px;
                background-color: var(--background-alt);
                border-radius: 0;
                padding: 8px 20px;
                border: solid 1px var(--secondary);
                color: var(--secondary);
            }

            .legalRow span.active{
                border-color: var(--primary);
                color: var(--primary);
                background-color: var(--background-alt2);
            }

            .legalSection{
                background-color:var(--background-alt);
            }

            .notesmall{
                width: unset;
                max-width: 400px;
                padding: 5px;
                border: 2px dashed var(--primary);
                border-radius: 5px;
                text-align: center;
                margin: 0 auto;
                background-image: unset;
                background-color: var(--background-alt);
            }

            .notesmall p{
                font-size:16px;
            }

            form.genericform{
                width: unset;
                max-width: 500px;
                padding: 15px;
                border: unset;
                border-top: 9px solid var(--primary);
                border-radius: 15px;
                text-align: left;
                margin:0 auto;
                background-image: unset;
                background-color: var(--background-alt);
                font-size: 16px;
                overflow: hidden;

                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            form.genericform input,
            input[type="text"].stylized,
            textarea.stylized,
            input[type="button"],
            button{
                background-color: var(--background-alt2);
                border: unset;
                width: calc(100% - 15px);
                border-radius: 5px;
                padding: 5px;
            }
                

            form.genericform small{
                text-align: center;
                color: var(--secondary);
            }

            form a{
                color:var(--secondary);
            }

            input[type="submit"]:hover{
                color: #fff;
                background-color:var(--primary);
            }

            .notetinywarning{
                background-color: var(--background-alt);
                border-radius: 5px;
                padding: 5px;
                text-align: center;
                margin: 0 auto;
                background-image:unset;
            }

            #dropzoneUpload{
                background-color: var(--background-alt);
                border-radius: 5px;
                text-align: center;
                margin: 20px auto;
                // width: 100%;
                max-width: 500px;
                border: 2px dashed var(--primary);
            }

            #dropzoneUpload:hover{
                background-color: var(--background-alt2);
            }

            div.dz-default{
                color: var(--secondary);
            }

            div.dz-preview{
                background-image:unset;
                background-color: var(--background-alt);
                border-radius: 5px;
                padding: 5px;
                margin: 10px auto;
            }

            div.responseText{
                background-color: var(--background-alt);
                border-radius: 5px;
                padding: 5px;
                margin: 5px;
                text-align: center;
                border: 2px solid var(--primary);
            }

            .container{
                background-color: var(--background-alt);
                color: var(--primary);
                border-radius: 5px;
                padding: 5px;
                margin: 5px auto;
                text-align: center;
                border: 2px dashed var(--primary);
            }

            .container .title,
            .container .formatrow a{
                color: var(--foreground);
            }

            .container hr{
                border-top:unset;
                border-bottom:1px solid var(--primary);
            }

            ul li.home{
                border: 2px solid var(--primary);
                border-radius: 5px;
                padding: 5px;
                margin: 5px;
                text-align: center;
                background-color: var(--background-alt);
                background-image:unset;
            }

            .loginstatus{
                display:none;
            }

            table{
                background-image:unset;
                background-color:var(--background-alt);
                border:1px solid var(--primary);
            }

            table td{
                border:1px solid var(--primary);
            }

            p.albumlink{
                background-color:var(--background-alt);
                border-radius:5px;
                padding:5px;
                margin:5px auto;
                text-align:center;
                border: 2px solid var(--primary);
            }

            form.urlUploadForm,
            .urlUploadForm button.urlUpSubmit,
            .urlUploadForm input[name="url"]{
                width:unset;
            }

            .urlUploadForm button.urlUpSubmit,
            .urlUploadForm input[name="url"]{
                background-color:var(--background-alt2);
                border: 2px solid var(--primary);
            }
            
        `;

        if(location.pathname === "/"){
            styleRewrite += `
                body{
                    margin:0;
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                    min-height:100dvh;
                }
            `;
        }

        styleRewrite += `</style>`;

        // if found input.stylized name="email" add style:width:100% ?????? I don't know why it's like this lol but need to be done with JS
        const emailInput = document.querySelector('input.stylized[name="email"]');
        if (emailInput) {
            emailInput.style.width = 'calc(100% - 15px)';
        }

        document.head.insertAdjacentHTML('beforeend', styleRewrite);
    }

    document.querySelector('div.footer').innerHTML += ", <a class='linkbutton' href='https://github.com/anytngv2/better-catbox' target='_blank'>Better Catbox</a>";
})();