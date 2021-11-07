'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector ='.post-author';
  
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

const generateTitleLinks = function(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);
  function clearTitleList(){
    titleList.innerHTML = '';
  }
  clearTitleList();

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

generateTitleLinks();

const generateTags = function(){
  
  const articles = document.querySelectorAll(optArticleSelector);
  
  for(let article of articles){
    
    const articleList = article.querySelector(optArticleTagsSelector);
    
    let html = '';

    const articleTags = article.getAttribute('data-tags');
    
    const articleTagsArray = articleTags.split(' ');
  
    for(let tag of articleTagsArray){
     
      const linkTag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
     
      html = html + linkTag;
    }
    articleList.innerHTML = html;
  }
};

generateTags();

function tagClickHandler(event){
  
  event.preventDefault();
  
  const clickedElement = this;
  
  const href = clickedElement.getAttribute('href');
  
  const tag = href.replace('#tag-', '');
  
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  
  for(let activeTag of activeTags){

    activeTag.classList.remove('active');
  }
  
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  
  for(let tagLink of tagLinks){
  
    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  
  for(let tagLink of tagLinks){
   
    tagLink.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();


function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){

    const author =  document.querySelector(optArticleAuthorSelector);

    const authorName = article.getAttribute('data-author');

    let html = '';

    const linkHTML = '<a href="#author-' + authorName + '">' + authorName + '</a>';

    html = html + linkHTML;

    author.innerHTML = html;

  }
}

generateAuthors();

function authorClickHandler(event){

  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for(let activeAuthor of activeAuthors){
    activeAuthor.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll('a.[href="' + href + '"]');

  for(let tag of tagLinks){
    tag.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors(){

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for(let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();