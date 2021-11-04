'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
  
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');

  const targetArticle = document.querySelector(articleSelector);

  targetArticle.classList.add('active');

};

const generateTitleLinks = function(){

  const titleList = document.querySelector(optTitleListSelector);
  function clearTitleList(){
    titleList.innerHTML = '';
  }
  clearTitleList();

  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';

  for(let article of articles){
    article.classList.add('article');

    const articleId = article.getAttribute('id');

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    html = html + linkHTML; 
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
};


function generateTags(){
  /* find all articles  DONE */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: DONE */
  for(let article of articles){
    /* find tags wrapper DONE*/
    const articleList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string DONE*/
    let html = '';
    /* get tags from data-tags attribute DONE*/
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array DONE*/
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);
    /* START LOOP: for each tag*/
    for(let tag of articleTagsArray){
      /* generate HTML of the link DONE*/
      const linkTag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* add generated code to html variable DONE*/
      html = html + linkTag;
    }
    /* END LOOP: for each tag*/
    /* insert HTML of all the links into the tags wrapper DONE*/
    articleList.innerHTML = html;
  }
  /* END LOOP: for every article: */
}
  
generateTitleLinks();
generateTags();