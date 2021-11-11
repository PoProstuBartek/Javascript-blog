'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

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

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    html = html + linkHTML; 
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
};

generateTitleLinks();

const calculateCollectionParams = function(items){

  const params = {max: 0, min: 999999};  

  for(let tag in items){
    params.max = Math.max(items[tag], params.max);
    params.min = Math.min(items[tag], params.min);
  }

  return params;

};

const calculateMinMaxParams = function(count, params){

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
     
      const linkTagData = {id: tag, title: tag};
      const linkTag = templates.tagLink(linkTagData);
     
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
  const tagsParams = calculateCollectionParams(allTags);
  const allTagsData = {tags: []};

  for(let tag in allTags){
    // const tagLinkHtml = '<li><a class="' + calculateMinMaxParams(allTags[tag], tagsParams) + ' " href="#tag-' + tag + '">' + tag + '</a></li>';
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateMinMaxParams(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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

const generateAuthors = function() {

  let allAuthors = {};

  const articles = document.querySelectorAll(opt.articleSelector);

  for(let article of articles){

    const author =  article.querySelector(opt.articleAuthorSelector);

    const authorName = article.getAttribute('data-author');

    let html = '';

    const linkHTMLData = {id: authorName, title: authorName};
    const linkHTML = templates.authorLink(linkHTMLData); //'<a href="#author-' + authorName + '">' + authorName + '</a>';

    html = html + linkHTML;

    if(!allAuthors.hasOwnProperty(authorName)){
      allAuthors[authorName] = 1;
    } else {
      allAuthors[authorName]++;
    }
  
    author.innerHTML = html;
  }
  const authorList = document.querySelector(opt.authorsListSelector);

  const authorsParams = calculateCollectionParams(allAuthors);

  const allAuthorsData = {authors: []};

  for(let authorName in allAuthors){
    //const authorLinkHtml = '<li><a class = "' + calculateMinMaxParams(allAuthors[authorName], authorsParams) + '" href="#author-' + authorName + '"> ' + authorName + ' (' + allAuthors[authorName] + ') ' +'</a></li>';
    allAuthorsData.authors.push({
      authorName: authorName,
      count: allAuthors[authorName],
      className: calculateMinMaxParams(allAuthors[authorName], authorsParams)
    });
  }
  console.log(allAuthorsData);
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
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