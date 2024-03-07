(()=>{"use strict";function e(e,n){var o=document.querySelector("#elements").content.querySelector(".card").cloneNode(!0),c=o.querySelector(".card__photo"),u=o.querySelector(".card__button"),a=o.querySelector(".card__like");return c.src=e.link,c.alt=e.name,o.querySelector(".card__text").textContent=e.name,c.onerror=function(){c.src="",c.alt=""},c.addEventListener("click",(function(){n(e.link,e.name)})),u.addEventListener("click",r),a.addEventListener("click",t),o}function t(e){e.target.classList.toggle("card__like_active")}function r(e){e.target.closest(".card").remove()}function n(e){e.classList.add("popup_opened"),document.addEventListener("keydown",c)}function o(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",c)}function c(e){"Escape"===e.key&&o(document.querySelector(".popup_opened"))}function u(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function l(e,t,r){e.classList.remove(r.inputErrorClass),t.textContent=""}function i(e,t,r){t?(e.disabled=!1,e.classList.remove(r.inactiveButtonClass)):(e.classList.add(r.inactiveButtonClass),e.disabled="disabled")}Array.from(document.querySelectorAll(".popup")).forEach((function(e){e.addEventListener("mouseup",(function(t){var r=t.target.classList;(r.contains("popup")||r.contains("popup__close"))&&o(e)}))}));var p=document.querySelector(".cards"),s=document.querySelector("#profile"),d=document.querySelector(".profile__pencil"),f=s.querySelector(".popup__close"),m=s.querySelector(".popup__forms"),y=m.querySelector(".popup__form_type_name"),_=m.querySelector(".popup__form_type_job"),v=(s.querySelector(".popup__save"),document.querySelector(".profile__name")),S=document.querySelector(".profile__text"),q=document.querySelector("#cards"),k=document.querySelector(".profile__plus"),E=q.querySelector(".popup__close"),h=q.querySelector(".popup__forms"),L=h.querySelector(".popup__form_type_title"),b=h.querySelector(".popup__form_type_link"),g=document.querySelector(".popup_overlay"),x=g.querySelector(".popup__photo"),C=g.querySelector(".popup__image-name"),A=g.querySelector(".popup__close");function j(e,t){x.src=e,x.alt=t,C.textContent=t,n(g)}m.addEventListener("submit",(function(e){e.preventDefault(),v.textContent=y.value,S.textContent=_.value,o(s)})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(t){var r;r=e(t,j),p.append(r)})),q.addEventListener("submit",(function(t){var r,n;t.preventDefault(),r={name:L.value,link:b.value},n=e(r,j),p.prepend(n),L.value="",b.value="",o(q)}));var B,w={formSelector:".popup__forms",inputSelector:".popup__form",submitButtonSelector:".popup__save",inactiveButtonClass:"popup__save_type_invalid",inputErrorClass:"popup__form_type_invalid"};B=w,u(document.querySelectorAll(B.formSelector)).forEach((function(e){!function(e,t){var r=e.querySelectorAll(t.inputSelector),n=e.querySelector(t.submitButtonSelector);i(n,e.checkValidity(),t),u(r).forEach((function(r){r.addEventListener("input",(function(){!function(e,t,r){var n=e.validity.valid,o=t.querySelector("#".concat(e.name,"-error"));n?l(e,o,r):function(e,t,r){e.classList.add(r.inputErrorClass),t.textContent=e.validationMessage}(e,o,r)}(r,e,t),i(n,e.checkValidity(),t)}))}))}(e,B)})),function(e,t){var r=e.querySelectorAll(t.inputSelector),n=e.querySelector(t.submitButtonSelector);u(r).forEach((function(r){l(r,e.querySelector("#".concat(r.name,"-error")),t)})),i(n,!1,t)}(m,w),d.addEventListener("click",(function(){y.value=v.textContent,_.value=S.textContent,n(s)})),f.addEventListener("click",(function(){o(s)})),k.addEventListener("click",(function(){n(q)})),E.addEventListener("click",(function(){o(q)})),x.addEventListener("click",(function(){n(g)})),A.addEventListener("click",(function(){o(g)}))})();