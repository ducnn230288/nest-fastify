/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable prefer-const */
const toggleDropDown = (element) => {
  const arrow = document.getElementById('arrow');
  const dropdownMenu = document.getElementById('dropmenu');
  element.addEventListener('click', () =>
    dropdownMenu?.classList.contains('invisible')
      ? dropdownMenu?.classList.remove('invisible')
      : dropdownMenu?.classList.add('invisible'),
  );
  element.addEventListener('click', () =>
    dropdownMenu?.classList.contains('invisible')
      ? arrow?.classList.replace('fa-chevron-up', 'fa-chevron-down')
      : arrow?.classList.replace('fa-chevron-down', 'fa-chevron-up'),
  );
};

const toggleDropList = (element) => {
  const dropList = document.getElementById('category');
  element.addEventListener('click', () =>
    dropList?.classList.contains('invisible')
      ? dropList.classList.remove('invisible')
      : dropList?.classList.add('invisible'),
  );
};

const chooseItem = (element) => {
  const items = document.querySelectorAll('.item');
  const dropList = document.getElementById('category');
  items?.forEach((item) => {
    item.addEventListener('click', () => {
      let selectedItem = item.querySelecto>('.itemtext');
      element.innerText = selectedItem?.innerText;
      dropList?.classList.contains('invisible')
        ? dropList.classList.remove('invisible')
        : dropList?.classList.add('invisible');
      items.forEach((item) => {
        item.classList.remove('bg-gray-200');
      });
      item.classList.add('bg-gray-200');
    });
  });
};

const searchItem = (element) => {
  const options = [
    'All Categories',
    'Milks and Dairies',
    'Wines & Alcohol',
    'Clothing & Beauty',
    'Pet Foods & Toy',
    'Fast food',
    'Baking material',
    'Vegetables',
    'Fresh Seafood',
    'Noodles & Rice',
    'Ice Cream',
  ];
  const listitems = document.querySelector('#listitems');
  element.addEventListener('keyup', () => {
    let arr = [];
    let searchedVal = element.value;
    arr = options
      .filter((data) => {
        return data.toLowerCase().includes(searchedVal);
      })
      .map(
        (
          data,
        ) => `<li class="item font-quicksand text-gray-grey text-[15px] cursor-pointer ml-2 py-2 hover:bg-green-bggrn">
                          <span class="itemtext">${data}</span>
                      </li>`,
      )
      .join('');
    if (listitems != null) {
      listitems.innerHTML = arr
        ? arr
        : `<span class="font-quicksand text-gray-grey text-[15px]">No result found</span>`;
    }
  });
};

const showMore = (element) => {
  const moreitem1 = document.querySelector('#moreitem1');
  const moreitem2 = document.querySelector('#moreitem2');
  const moreitem3 = document.querySelector('#moreitem3');
  const moreitem4 = document.querySelector('#moreitem4');
  const plusbtn = document.getElementById('plus');
  element.addEventListener('click', () => {
    moreitem1?.classList.contains('hidden')
      ? plusbtn?.classList.replace('fa-plus-circle', 'fa-minus-circle')
      : plusbtn?.classList.replace('fa-minus-circle', 'fa-plus-circle');
    moreitem1?.classList.toggle('hidden');
    moreitem2?.classList.toggle('hidden');
    moreitem3?.classList.toggle('hidden');
    moreitem4?.classList.toggle('hidden');
  });
};

const dropHome = (element) => {
  const hometitle = document.querySelector('#hometitle');
  const homelist = document.querySelector('#homelist');
  element.addEventListener('click', () => {
    element.classList.contains('fa-chevron-down')
      ? element.classList.replace('fa-chevron-down', 'fa-chevron-up')
      : element.classList.replace('fa-chevron-up', 'fa-chevron-down');
    homelist?.classList.toggle('hidden');
    homelist?.classList.contains('hidden')
      ? hometitle?.classList.replace('text-green-grn', 'text-gray-blck')
      : hometitle?.classList.replace('text-gray-blck', 'text-green-grn');
  });
};

const dropShop = (element) => {
  const shoptitle = document.querySelector('#shoptitle');
  const shoplist = document.querySelector('#shoplist');
  element.addEventListener('click', () => {
    element.classList.contains('fa-chevron-down')
      ? element.classList.replace('fa-chevron-down', 'fa-chevron-up')
      : element.classList.replace('fa-chevron-up', 'fa-chevron-down');
    shoplist?.classList.toggle('hidden');
    shoplist?.classList.contains('hidden')
      ? shoptitle?.classList.replace('text-green-grn', 'text-gray-blck')
      : shoptitle?.classList.replace('text-gray-blck', 'text-green-grn');
  });
};

const dropProduct = (element) => {
  const producttitle = document.querySelector('#producttitle');
  const productlist = document.querySelector('#productlist');
  element.addEventListener('click', () => {
    element.classList.contains('fa-chevron-down')
      ? element.classList.replace('fa-chevron-down', 'fa-chevron-up')
      : element.classList.replace('fa-chevron-up', 'fa-chevron-down');
    productlist?.classList.toggle('hidden');
    productlist?.classList.contains('hidden')
      ? producttitle?.classList.replace('text-green-grn', 'text-gray-blck')
      : producttitle?.classList.replace('text-gray-blck', 'text-green-grn');
  });
};

const dropInv = (element) => {
  const invtitle = document.querySelector('#invtitle');
  const invlist = document.querySelector('#invlist');
  element.addEventListener('click', () => {
    element.classList.contains('fa-chevron-down')
      ? element.classList.replace('fa-chevron-down', 'fa-chevron-up')
      : element.classList.replace('fa-chevron-up', 'fa-chevron-down');
    invlist?.classList.toggle('hidden');
    invlist?.classList.contains('hidden')
      ? invtitle?.classList.replace('text-green-grn', 'text-gray-blck')
      : invtitle?.classList.replace('text-gray-blck', 'text-green-grn');
  });
};

const dropVen = (element) => {
  const ventitle = document.querySelector('#ventitle');
  const venlist = document.querySelector('#venlist');
  element.addEventListener('click', () => {
    element.classList.contains('fa-chevron-down')
      ? element.classList.replace('fa-chevron-down', 'fa-chevron-up')
      : element.classList.replace('fa-chevron-up', 'fa-chevron-down');
    venlist?.classList.toggle('hidden');
    venlist?.classList.contains('hidden')
      ? ventitle?.classList.replace('text-green-grn', 'text-gray-blck')
      : ventitle?.classList.replace('text-gray-blck', 'text-green-grn');
  });
};

const dropMega = (element) => {
  const megatitle = document.querySelector('#megatitle');
  const megalist = document.querySelector('#megalist');
  element.addEventListener('click', () => {
    element.classList.contains('fa-chevron-down')
      ? element.classList.replace('fa-chevron-down', 'fa-chevron-up')
      : element.classList.replace('fa-chevron-up', 'fa-chevron-down');
    megalist?.classList.toggle('hidden');
    megalist?.classList.contains('hidden')
      ? megatitle?.classList.replace('text-green-grn', 'text-gray-blck')
      : megatitle?.classList.replace('text-gray-blck', 'text-green-grn');
  });
};

const dropWomen = (element) => {
  const wmtitle = document.querySelector('#wmtitle');
  const wmlist = document.querySelector('#wmlist');
  element.addEventListener('click', () => {
    element.classList.contains('fa-chevron-down')
      ? element.classList.replace('fa-chevron-down', 'fa-chevron-up')
      : element.classList.replace('fa-chevron-up', 'fa-chevron-down');
    wmlist?.classList.toggle('hidden');
    wmlist?.classList.contains('hidden')
      ? wmtitle?.classList.replace('text-green-grn', 'text-gray-blck')
      : wmtitle?.classList.replace('text-gray-blck', 'text-green-grn');
  });
};

const dropMen = (element) => {
  const mtitle = document.querySelector('#mtitle');
  const mlist = document.querySelector('#mlist');
  element.addEventListener('click', () => {
    element.classList.contains('fa-chevron-down')
      ? element.classList.replace('fa-chevron-down', 'fa-chevron-up')
      : element.classList.replace('fa-chevron-up', 'fa-chevron-down');
    mlist?.classList.toggle('hidden');
    mlist?.classList.contains('hidden')
      ? mtitle?.classList.replace('text-green-grn', 'text-gray-blck')
      : mtitle?.classList.replace('text-gray-blck', 'text-green-grn');
  });
};

const dropTech = (element) => {
  const techtitle = document.querySelector('#techtitle');
  const techlist = document.querySelector('#techlist');
  element.addEventListener('click', () => {
    element.classList.contains('fa-chevron-down')
      ? element.classList.replace('fa-chevron-down', 'fa-chevron-up')
      : element.classList.replace('fa-chevron-up', 'fa-chevron-down');
    techlist?.classList.toggle('hidden');
    techlist?.classList.contains('hidden')
      ? techtitle?.classList.replace('text-green-grn', 'text-gray-blck')
      : techtitle?.classList.replace('text-gray-blck', 'text-green-grn');
  });
};

const dropBlog = (element) => {
  const blogtitle = document.querySelector('#blogtitle');
  const bloglist = document.querySelector('#bloglist');
  element.addEventListener('click', () => {
    element.classList.contains('fa-chevron-down')
      ? element.classList.replace('fa-chevron-down', 'fa-chevron-up')
      : element.classList.replace('fa-chevron-up', 'fa-chevron-down');
    bloglist?.classList.toggle('hidden');
    bloglist?.classList.contains('hidden')
      ? blogtitle?.classList.replace('text-green-grn', 'text-gray-blck')
      : blogtitle?.classList.replace('text-gray-blck', 'text-green-grn');
  });
};

const dropLayout = (element) => {
  const layouttitle = document.querySelector('#layouttitle');
  const layoutlist = document.querySelector('#layoutlist');
  element.addEventListener('click', () => {
    element.classList.contains('fa-chevron-down')
      ? element.classList.replace('fa-chevron-down', 'fa-chevron-up')
      : element.classList.replace('fa-chevron-up', 'fa-chevron-down');
    layoutlist?.classList.toggle('hidden');
    layoutlist?.classList.contains('hidden')
      ? layouttitle?.classList.replace('text-green-grn', 'text-gray-blck')
      : layouttitle?.classList.replace('text-gray-blck', 'text-green-grn');
  });
};

const dropPage = (element) => {
  const pagetitle = document.querySelector('#pagetitle');
  const pagelist = document.querySelector('#pagelist');
  element.addEventListener('click', () => {
    element.classList.contains('fa-chevron-down')
      ? element.classList.replace('fa-chevron-down', 'fa-chevron-up')
      : element.classList.replace('fa-chevron-up', 'fa-chevron-down');
    pagelist?.classList.toggle('hidden');
    pagelist?.classList.contains('hidden')
      ? pagetitle?.classList.replace('text-green-grn', 'text-gray-blck')
      : pagetitle?.classList.replace('text-gray-blck', 'text-green-grn');
  });
};

const dropLng = (element) => {
  const lngtitle = document.querySelector('#lngtitle');
  const lnglist = document.querySelector('#lnglist');
  element.addEventListener('click', () => {
    element.classList.contains('fa-chevron-down')
      ? element.classList.replace('fa-chevron-down', 'fa-chevron-up')
      : element.classList.replace('fa-chevron-up', 'fa-chevron-down');
    lnglist?.classList.toggle('hidden');
    lnglist?.classList.contains('hidden')
      ? lngtitle?.classList.replace('text-green-grn', 'text-gray-blck')
      : lngtitle?.classList.replace('text-gray-blck', 'text-green-grn');
  });
};

const closeMenu = (element) => {
  const slidemenu = document.querySelector('#slidemenu');
  element.addEventListener('click', () => {
    slidemenu?.classList.add('-translate-x-full');
  });
};

const openMenu = (element) => {
  const slidemenu = document.querySelector('#slidemenu');
  element.addEventListener('click', () => {
    slidemenu?.classList.remove('-translate-x-full');
  });
};
