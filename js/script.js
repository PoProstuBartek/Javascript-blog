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
  console.log('Custom selector to: ' + customSelector);
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
};

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event DONE */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" DONE*/
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element DONE*/
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant DONE */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active DONE */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */ 
  for(let activeTag of activeTags){
    /* remove class active DONE */
    activeTag.classList.remove('active');
  }
  /* END LOOP: for each active tag link */
  /* find all tag links with "href" attribute equal to the "href" constant DONE */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){
    /* add class active DONE */
    tagLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument DONE */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags DONE */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link DONE */
    tagLink.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
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