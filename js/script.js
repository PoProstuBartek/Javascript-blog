'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  heroLink: Handlebars.compile(document.querySelector('#template-hero-link').innerHTML),
  heroCloudLink: Handlebars.compile(document.querySelector('#template-hero-cloud-link').innerHTML)
};

const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleheroSelector: '.post-hero',
  tagsListSelector: '.tags.list',
  heroesListSelector: '.heroes.list',
  heroClassCount: 5,
  heroClassPrefix: 'hero-size-',
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

const generateheroes = function() {
  let allheroes = {};
  const articles = document.querySelectorAll(opt.articleSelector);

  for(let article of articles){

    const hero =  article.querySelector(opt.articleheroSelector);
    const heroName = article.getAttribute('data-hero');
    let html = '';

    const linkHTMLData = {id: heroName, title: heroName};
    const linkHTML = templates.heroLink(linkHTMLData);

    html = html + linkHTML;

    if(!allheroes.hasOwnProperty(heroName)){
      allheroes[heroName] = 1;
    } else {
      allheroes[heroName]++;
    }
  
    hero.innerHTML = html;
  }
  const heroList = document.querySelector(opt.heroesListSelector);

  const herosParams = calculateCollectionParams(allheroes);

  const allherosData = {heros: []};

  for(let heroName in allheroes){
    allherosData.heros.push({
      heroName: heroName,
      count: allheroes[heroName],
      className: calculateMinMaxParams(allheroes[heroName], herosParams)
    });
  }
  heroList.innerHTML = templates.heroCloudLink(allherosData);
};

generateheroes();

const heroClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  const hero = href.replace('#hero-', '');
  const activeheros = document.querySelectorAll('a.active[href^="#hero-"]');

  for(let activehero of activeheros){
    activehero.classList.remove('active');
  }

  const clickedheros = document.querySelectorAll('a.active[href^="#hero-"]');

  for(let clickedhero of clickedheros){
    clickedhero.classList.add('active');
  }

  generateTitleLinks('[data-hero="' + hero + '"]');
};


const addClickListenersToheros = function(){

  const heroLinks = document.querySelectorAll('a[href^="#hero-"]');

  for(let heroLink of heroLinks){
    heroLink.addEventListener('click', heroClickHandler);
  }
};

addClickListenersToheros();