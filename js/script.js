'use strict';

const opt = {

  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.tags.list',
  authorsListSelector: '.authors.list',
  authorClassCount: 5,
  authorClassPrefix: 'author-size-',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-'

};
  
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

  const titleList = document.querySelector(opt.titleListSelector);
  function clearTitleList(){
    titleList.innerHTML = '';
  }
  clearTitleList();

  const articles = document.querySelectorAll(opt.articleSelector + customSelector);
  let html = '';

  for(let article of articles){
    article.classList.add('article');

    const articleId = article.getAttribute('id');

    const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

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

  const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);

  return opt.cloudClassPrefix + classNumber;
};

const generateTags = function(){
  
  let allTags = {};

  const articles = document.querySelectorAll(opt.articleSelector);
  
  for(let article of articles){
    
    const articleList = article.querySelector(opt.articleTagsSelector);
    
    let html = '';

    const articleTags = article.getAttribute('data-tags');
    
    const articleTagsArray = articleTags.split(' ');
  
    for(let tag of articleTagsArray){
     
      const linkTag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
     
      html = html + linkTag;

      if(!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    articleList.innerHTML = html;
  }
  const tagList = document.querySelector(opt.tagsListSelector);
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
  }

  return params;

};

const calculateAuthorClass = function(count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor(percentage * (opt.authorClassCount - 1) + 1);

  return opt.authorClassPrefix + classNumber;
};


const generateAuthors = function() {

  let allAuthors = {};

  const articles = document.querySelectorAll(opt.articleSelector);

  for(let article of articles){

    const author =  article.querySelector(opt.articleAuthorSelector);

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
  const authorList = document.querySelector(opt.authorsListSelector);

  const authorsParams = calculateAuthorsParams(allAuthors);

  let allAuthorsHtml = '';

  for(let authorName in allAuthors){
    const authorLinkHtml = '<li><a class = "' + calculateAuthorClass(allAuthors[authorName], authorsParams) + '" href="#author-' + authorName + '"> ' + authorName + '</a></li>';
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