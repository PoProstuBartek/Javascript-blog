'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector ='.post-author';
const optTagsListSelector = '.tags.list';
const optAuthorsListSelector = '.authors.list';
const optAuthorClassCount = 5;
const optAuthorClassPrefix = 'author-size-';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';
  
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

const calculateTagsParams  = function(tags){

  const params = {max: 0, min: 999999};  

  for(let tag in tags){
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params; 
};

const calculateTagClass = function(count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
};

const generateTags = function(){
  
  let allTags = {};

  const articles = document.querySelectorAll(optArticleSelector);
  
  for(let article of articles){
    
    const articleList = article.querySelector(optArticleTagsSelector);
    
    let html = '';

    const articleTags = article.getAttribute('data-tags');
    
    const articleTagsArray = articleTags.split(' ');
  
    for(let tag of articleTagsArray){
     
      const linkTag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
     
      html = html + linkTag;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    articleList.innerHTML = html;
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  const tagsParams = calculateTagsParams(allTags);
  let allTagsHtml = '';

  for(let tag in allTags){
    const tagLinkHtml = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + ' " href="#tag-' + tag + '">' + tag + '</a></li>';
    allTagsHtml += tagLinkHtml;
  }
  tagList.innerHTML = allTagsHtml;
};

generateTags();

const tagClickHandler = function(event){
  
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
};

const addClickListenersToTags = function(){

  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  
  for(let tagLink of tagLinks){
   
    tagLink.addEventListener('click', tagClickHandler);
  }
};

addClickListenersToTags();

const calculateAuthorsParams = function(authors){

  const params = {max: 0, min: 999999};  

  for(let tag in authors){
    params.max = Math.max(authors[tag], params.max);
    params.min = Math.min(authors[tag], params.min);
    console.log(tag + '  is used ' + authors[tag] + ' times'); 
  }

  return params;

};

const calculateAuthorClass = function(count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor(percentage * (optAuthorClassCount - 1) + 1);

  return optAuthorClassPrefix + classNumber;
};


const generateAuthors = function() {

  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){

    const author =  article.querySelector(optArticleAuthorSelector);

    const authorName = article.getAttribute('data-author');

    let html = '';

    const linkHTML = '<a href="#author-' + authorName + '">' + authorName + '</a>';

    html = html + linkHTML;

    if(!allAuthors.hasOwnProperty(authorName)){
      allAuthors[authorName] = 1;
    } else {
      allAuthors[authorName]++;
    }
  
    author.innerHTML = html;
  }
  const authorList = document.querySelector(optAuthorsListSelector);

  const authorsParams = calculateAuthorsParams(allAuthors);

  let allAuthorsHtml = '';

  for(let authorName in allAuthors){
    const authorLinkHtml = '<li><a class = "' + calculateAuthorClass(allAuthors[authorName], authorsParams) + '" href="#author-' + authorName + '"> ' + authorName + '</a></li>';
    console.log(authorLinkHtml);
    allAuthorsHtml += authorLinkHtml;
  }
  authorList.innerHTML = allAuthorsHtml;
};

generateAuthors();

const authorClickHandler = function(event){

  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for(let activeAuthor of activeAuthors){
    activeAuthor.classList.remove('active');
  }

  const clickedAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for(let clickedAuthor of clickedAuthors){
    clickedAuthor.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
};


const addClickListenersToAuthors = function(){

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for(let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
};

addClickListenersToAuthors();