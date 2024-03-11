*** Settings ***
Resource               ../keywords/common.robot
Test Setup             Setup
Test Teardown          Tear Down
Library                DateTime

*** Test Cases ***
### Link to testcases https://docs.google.com/spreadsheets/d/1R_jW5GBVBaMy7YgNKJQ2Ha5xW12Vn0nRzOHE0-OsyF8/edit#gid=1857962472 ###
PL_01 Verify the User Interface of "Danh sách post" page
  [Tags]                                                                                                MainPage                   UI                     Smoketest
  Login to admin
  When Click "Thiết lập" menu
  When Click "Post" sub menu to "/#/vn/setting/post"
  Then Heading should contain "Danh sách post" inner text
  Then Confirm locating exactly in "Post" page of "Thiết lập" menu
  Then Webpage should contain the list data from database
  Then Webpage should contain the search function
  Then Webpage should contain "Tên Post" column with sort and search function
  Then Webpage should contain "Slug" column with sort and search function
  Then Webpage should contain "Created" column with sort and search function
  Then Webpage should contain "Post Type" group
  Then Webpage should contain "Tạo mới" button

PL_02 Verify the User Interface of "Danh sách post" page in "Projects" category
  [Tags]                                                                                                MainPage                     Projects
  Login to admin
  When Click "Thiết lập" menu
  When Click "Post" sub menu to "/#/vn/setting/post"
  Then Click on "second" selection to change the number of data show in list and check
  Then Click on "third" selection to change the number of data show in list and check
  Then Click on "fourth" selection to change the number of data show in list and check
  Then Click on "fifth" selection to change the number of data show in list and check

PL_03 Verify the function of changing the page's number the list of posts in "Projects" category
  [Tags]                                                                                                MainPage                     Projects
  Go to "Danh sách post" page with "Projects" list
  Then Check the amount of page list
       ${Last_name}=            Get data in the last row
  When Create a test post in "Project" list
  When Move to the "next" page
       ${First_name}=           Get data in the first row
  Then Should Be Equal          ${First_name}    ${Last_name}
  When Move to the "perious" page
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Move to the last page and check

PL_04 Verify the highlight table line function after operated in "Projects" category
  [Tags]                                                                                                MainPage                     Projects
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click "Huỷ bỏ" button
  Then "_@Name@_" table line should be highlighted
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_05 Verify the User Interface of "Danh sách post" page in "News" category
  [Tags]                                                                                                MainPage                     News
  Login to admin
  When Click "Thiết lập" menu
  When Click "Post" sub menu to "/#/vn/setting/post"
  Then Click on "second" selection to change the number of data show in list and check
  Then Click on "third" selection to change the number of data show in list and check
  Then Click on "fourth" selection to change the number of data show in list and check
  Then Click on "fifth" selection to change the number of data show in list and check

PL_06 Verify the function of changing the page's number the list of posts in "News" category
  [Tags]                                                                                                MainPage                     News
  Go to "Danh sách post" page with "News" list
  Then Check the amount of page list
       ${Last_name}=            Get data in the last row
  When Create a test post in "Project" list
  When Move to the "next" page
       ${First_name}=           Get data in the first row
  Then Should Be Equal          ${First_name}    ${Last_name}
  When Move to the "perious" page
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Move to the last page and check

PL_07 Verify the highlight table line function after operated in "News" category
  [Tags]                                                                                                MainPage                     News
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click "Huỷ bỏ" button
  Then "_@Name@_" table line should be highlighted
  When Click on the "Xóa" button in the "_@Name@_" table line

### Verify the activate function ###
PL_08 Verify that switch off post when click on "Đã kích hoạt" button
  [Tags]                                                                                                Activate                     Projects
  Create a test post in "Projects" list
  When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
  Then User look message "Cập nhật thành công" popup
  Then The status button in the "_@Name@_" table line should change to "Đã vô hiệu hóa"
  When Click on the "Xóa" button in the "_@Name@_" table line

# PL_09 Verify that switch off post when click on "Đã kích hoạt" button
#   [Tags]                                                                                                Activate                     Projects
#   Create a test post in "Projects" list
#   When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
#   When Click on the "Đã vô hiệu hóa" button in the "_@Name@_" table line
#   Then User look message "Cập nhật thành công" popup
#   Then The status button in the "_@Name@_" table line should change to "Đã kích hoạt"
#   When Click on the "Xóa" button in the "_@Name@_" table line

PL_10 Verify that switch off post when click on "Đã kích hoạt" button
  [Tags]                                                                                                Activate                     News
  Create a test post in "News" list
  When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
  Then User look message "Cập nhật thành công" popup
  Then The status button in the "_@Name@_" table line should change to "Đã vô hiệu hóa"
  When Click on the "Xóa" button in the "_@Name@_" table line

# PL_11 Verify that switch off post when click on "Đã kích hoạt" button
#   [Tags]                                                                                                Activate                     News
#   Create a test post in "News" list
#   When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
#   When Click on the "Đã vô hiệu hóa" button in the "_@Name@_" table line
#   Then User look message "Cập nhật thành công" popup
#   Then The status button in the "_@Name@_" table line should change to "Đã kích hoạt"
#   When Click on the "Xóa" button in the "_@Name@_" table line

### Verify the search function ###
## Verify the search function in "Projects" list ##
# PL_12 Verify the function of input search box
#   [Tags]                                                                                                Search                       Projects
#   ${Post}=                 Create a test post in "Projects" list
#   Create a test post in "Projects" list
#   When Enter "text" in placeholder "Tìm kiếm" with "${Post}"
#   Then "${Post}" should be visible in the table line
#   Then "_@Name@_" should not be visible in the table line
#   When Click on the "Xóa" button in the "${Post}" table line
#   When Enter "text" in placeholder "Tìm kiếm" with ""
#   When Click on the "Xóa" button in the "_@Name@_" table line

# PL_13 Verify the function of input search box
#   [Tags]                                                                                                Search                       Projects
#   Create a test post in "Projects" list
#   When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
#   Then Table line should show empty
#   When Click on cross icon in input search box
#   Then "_@Name@_" should be visible in the table line
#   When Click on the "Xóa" button in the "_@Name@_" table line

# PL_14 Verify the function of input search box when cancel action
#   [Tags]                                                                                                Search                       Projects
#   ${Post}=                 Create a test post in "Projects" list
#   Create a test post in "Projects" list
#   When Enter "text" in placeholder "Tìm kiếm" with "${Post}"
#   Then "${Post}" should be visible in the table line
#   Then "_@Name@_" should not be visible in the table line
#   When Enter "text" in placeholder "Tìm kiếm" with ""
#   Then "_@Name@_" should be visible in the table line
#   When Click on the "Xóa" button in the "_@Name@_" table line
#   When Click on the "Xóa" button in the "${Post}" table line

# PL_15 Verify the search function of the magnifier icon in "Tên Post" column
#   [Tags]                                                                                                Search                       Projects                        Name
#   ${Post}=                 Create a test post in "Projects" list
#   Create a test post in "Projects" list
#   When Click on magnifier icon in "Tên Post" table cell
#   When Enter "text" in placeholder "Tìm kiếm" with "Post"
#   When Click "Tìm kiếm" button
#   Then "${Post}" should be visible in the table line
#   Then "_@Name@_" should not be visible in the table line
#   When Click on the "Xóa" button in the "${Post}" table line
#   When Click "Cài lại" button
#   When Click on the "Xóa" button in the "_@Name@_" table line

# PL_16 Verify the search function of the magnifier icon in "Tên Post" column by entering a "Tên Post" that was not existed
#   [Tags]                                                                                                Search                       Projects                        Name
#   Create a test post in "Projects" list
#   When Click on magnifier icon in "Tên Post" table cell
#   When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
#   When Click "Tìm kiếm" button
#   Then Table line should show empty
#   When Click "Cài lại" button
#   Then "_@Name@_" should be visible in the table line
#   When Click on the "Xóa" button in the "_@Name@_" table line

# PL_17 Verify the search function of the magnifier icon in "Tên Post" column when cancel action with "Cài lại" button
#   [Tags]                                                                                                Search                       Projects                        Name
#   ${Post}=                 Create a test post in "Projects" list
#   Create a test post in "Projects" list
#   When Click on magnifier icon in "Tên Post" table cell
#   When Enter "text" in placeholder "Tìm kiếm" with "Post"
#   When Click "Tìm kiếm" button
#   Then "${Post}" should be visible in the table line
#   Then "_@Name@_" should not be visible in the table line
#   When Click "Cài lại" button
#   Then "_@Name@_" should be visible in the table line
#   When Click on the "Xóa" button in the "_@Name@_" table line
#   When Click on the "Xóa" button in the "${Post}" table line

# PL_18 Verify the search function of the magnifier icon in "Slug" column
#   [Tags]                                                                                                Search                       Projects                        Slug
#   ${Post}=                 Create a test post in "Projects" list with "Post" in slug
#   Create a test post in "Projects" list
#   When Click on magnifier icon in "Slug" table cell
#   When Enter "text" in placeholder "Tìm kiếm" with "Post"
#   When Click "Tìm kiếm" button
#   Then "${Post}" should be visible in the table line
#   Then "_@Name@_" should not be visible in the table line
#   When Click on the "Xóa" button in the "${Post}" table line
#   When Click "Cài lại" button
#   When Click on the "Xóa" button in the "_@Name@_" table line

# PL_19 Verify the search function of the magnifier icon in "Slug" column by entering a "Slug" that was not existed
#   [Tags]                                                                                                Search                       Projects                        Slug
#   Create a test post in "Projects" list
#   When Click on magnifier icon in "Slug" table cell
#   When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
#   When Click "Tìm kiếm" button
#   Then Table line should show empty
#   When Click "Cài lại" button
#   Then "_@Name@_" should be visible in the table line
#   When Click on the "Xóa" button in the "_@Name@_" table line

# PL_20 Verify the search function of the magnifier icon in "Slug" column when cancel action with "Cài lại" button
#   [Tags]                                                                                                Search                       Projects                        Slug
#   ${Post}=                 Create a test post in "Projects" list with "Post" in slug
#   Create a test post in "Projects" list
#   When Click on magnifier icon in "Slug" table cell
#   When Enter "text" in placeholder "Tìm kiếm" with "Post"
#   When Click "Tìm kiếm" button
#   Then "${Post}" should be visible in the table line
#   Then "_@Name@_" should not be visible in the table line
#   When Click "Cài lại" button
#   Then "_@Name@_" should be visible in the table line
#   When Click on the "Xóa" button in the "_@Name@_" table line
#   When Click on the "Xóa" button in the "${Post}" table line

# PL_21 Verify the search by date function of the calendar icon in "Created" column
#   [Tags]                                                                                                Search                       Projects                        Slug
#   ${Today}=                                                                                             Get Current Date             local                           result_format=%d/%m/%Y
#   Create a test post in "Projects" list
#   When Click on calendar icon in "Created" table cell
#   When Enter "date" in placeholder "Ngày bắt đầu" with "${Today}"
#   When Enter "date" in placeholder "Ngày kết thúc" with "${Today}"
#   When Click "Tìm kiếm" button
#   Then "_@Name@_" should be visible in the table line
#   When Click on the "Xóa" button in the "_@Name@_" table line

# ## Verify the search function in "News" list ##
# PL_22 Verify the function of input search box
#   [Tags]                                                                                                Search                       News
#   ${Post}=                 Create a test post in "News" list
#   Create a test post in "News" list
#   When Enter "text" in placeholder "Tìm kiếm" with "${Post}"
#   Then "${Post}" should be visible in the table line
#   Then "_@Name@_" should not be visible in the table line
#   When Click on the "Xóa" button in the "${Post}" table line
#   When Enter "text" in placeholder "Tìm kiếm" with ""
#   When Click on the "Xóa" button in the "_@Name@_" table line

# PL_23 Verify the function of input search box
#   [Tags]                                                                                                Search                       News
#   Create a test post in "News" list
#   When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
#   Then Table line should show empty
#   When Click on cross icon in input search box
#   Then "_@Name@_" should be visible in the table line
#   When Click on the "Xóa" button in the "_@Name@_" table line

# PL_24 Verify the function of input search box when cancel action
#   [Tags]                                                                                                Search                       News
#   ${Post}=                 Create a test post in "News" list
#   Create a test post in "News" list
#   When Enter "text" in placeholder "Tìm kiếm" with "${Post}"
#   Then "${Post}" should be visible in the table line
#   Then "_@Name@_" should not be visible in the table line
#   When Enter "text" in placeholder "Tìm kiếm" with ""
#   Then "_@Name@_" should be visible in the table line
#   When Click on the "Xóa" button in the "_@Name@_" table line
#   When Click on the "Xóa" button in the "${Post}" table line

# PL_25 Verify the search function of the magnifier icon in "Tên Post" column
#   [Tags]                                                                                                Search                       News                        Name
#   ${Post}=                 Create a test post in "News" list
#   Create a test post in "News" list
#   When Click on magnifier icon in "Tên Post" table cell
#   When Enter "text" in placeholder "Tìm kiếm" with "Post"
#   When Click "Tìm kiếm" button
#   Then "${Post}" should be visible in the table line
#   Then "_@Name@_" should not be visible in the table line
#   When Click on the "Xóa" button in the "${Post}" table line
#   When Click "Cài lại" button
#   When Click on the "Xóa" button in the "_@Name@_" table line

# PL_26 Verify the search function of the magnifier icon in "Tên Post" column by entering a "Tên Post" that was not existed
#   [Tags]                                                                                                Search                       News                        Name
#   Create a test post in "News" list
#   When Click on magnifier icon in "Tên Post" table cell
#   When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
#   When Click "Tìm kiếm" button
#   Then Table line should show empty
#   When Click "Cài lại" button
#   Then "_@Name@_" should be visible in the table line
#   When Click on the "Xóa" button in the "_@Name@_" table line

# PL_27 Verify the search function of the magnifier icon in "Tên Post" column when cancel action with "Cài lại" button
#   [Tags]                                                                                                Search                       News                        Name
#   ${Post}=                 Create a test post in "News" list
#   Create a test post in "News" list
#   When Click on magnifier icon in "Tên Post" table cell
#   When Enter "text" in placeholder "Tìm kiếm" with "Post"
#   When Click "Tìm kiếm" button
#   Then "${Post}" should be visible in the table line
#   Then "_@Name@_" should not be visible in the table line
#   When Click "Cài lại" button
#   Then "_@Name@_" should be visible in the table line
#   When Click on the "Xóa" button in the "_@Name@_" table line
#   When Click on the "Xóa" button in the "${Post}" table line

# PL_28 Verify the search function of the magnifier icon in "Slug" column
#   [Tags]                                                                                                Search                       News                        Slug
#   ${Post}=                 Create a test post in "News" list with "Post" in slug
#   Create a test post in "News" list
#   When Click on magnifier icon in "Slug" table cell
#   When Enter "text" in placeholder "Tìm kiếm" with "Post"
#   When Click "Tìm kiếm" button
#   Then "${Post}" should be visible in the table line
#   Then "_@Name@_" should not be visible in the table line
#   When Click on the "Xóa" button in the "${Post}" table line
#   When Click "Cài lại" button
#   When Click on the "Xóa" button in the "_@Name@_" table line

# PL_29 Verify the search function of the magnifier icon in "Slug" column by entering a "Slug" that was not existed
#   [Tags]                                                                                                Search                       News                        Slug
#   Create a test post in "News" list
#   When Click on magnifier icon in "Slug" table cell
#   When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
#   When Click "Tìm kiếm" button
#   Then Table line should show empty
#   When Click "Cài lại" button
#   Then "_@Name@_" should be visible in the table line
#   When Click on the "Xóa" button in the "_@Name@_" table line

# PL_30 Verify the search function of the magnifier icon in "Slug" column when cancel action with "Cài lại" button
#   [Tags]                                                                                                Search                       News                        Slug
#   ${Post}=                 Create a test post in "News" list with "Post" in slug
#   Create a test post in "News" list
#   When Click on magnifier icon in "Slug" table cell
#   When Enter "text" in placeholder "Tìm kiếm" with "Post"
#   When Click "Tìm kiếm" button
#   Then "${Post}" should be visible in the table line
#   Then "_@Name@_" should not be visible in the table line
#   When Click "Cài lại" button
#   Then "_@Name@_" should be visible in the table line
#   When Click on the "Xóa" button in the "_@Name@_" table line
#   When Click on the "Xóa" button in the "${Post}" table line

# PL_31 Verify the search by date function of the calendar icon in "Created" column
#   [Tags]                                                                                                Search                       News                        Slug
#   ${Today}=                                                                                             Get Current Date             local                           result_format=%d/%m/%Y
#   Create a test post in "News" list
#   When Click on calendar icon in "Created" table cell
#   When Enter "date" in placeholder "Ngày bắt đầu" with "${Today}"
#   When Enter "date" in placeholder "Ngày kết thúc" with "${Today}"
#   When Click "Tìm kiếm" button
#   Then "_@Name@_" should be visible in the table line
#   When Click on the "Xóa" button in the "_@Name@_" table line

### Verify the sort function ###
PL_32 Verify the sort function when click on sort icon in "Tên Post" column
  [Tags]                                                                                                Sort                          Projects                        Slug
  Create a test post in "Projects" list with "A" in post name
  Create a test post in "Projects" list with "Z" in post name
  When Click on sort icon in "Tên Post" table cell
  Then "A" should be visible in the first table line
  Then "Z" should not be visible in the first table line
  When Click on sort icon in "Tên Post" table cell
  Then "A" should not be visible in the first table line
  Then "Z" should be visible in the first table line
  When Click on sort icon in "Tên Post" table cell
  When Click on the "Xóa" button in the "Z" table line
  When Click on the "Xóa" button in the "A" table line

PL_33 Verify the sort function when click on sort icon in "Slug" column
  [Tags]                                                                                                Sort                          Projects                        Slug
  ${Post}=                 Create a test post in "Projects" list with "A" in slug
  Create a test post in "Projects" list with "Z" in slug
  When Click on sort icon in "Slug" table cell
  Then "${Post}" should be visible in the first table line
  Then "_@Name@_" should not be visible in the first table line
  When Click on sort icon in "Slug" table cell
  Then "${Post}" should not be visible in the first table line
  Then "_@Name@_" should be visible in the first table line
  When Click on sort icon in "Slug" table cell
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Post}" table line

#PL_34 Verify the sort function when click on sort icon in "Tên Post" column
#  [Tags]                                                                                                Sort                          Projects                        Slug   BUG1
#  Create a test post in "Projects" list
#  When Click on sort icon in "Created" table cell
#  Then "_@Name@_" should not be visible in the first table line
#  When Click on sort icon in "Created" table cell
#  Then "_@Name@_" should be visible in the first table line
#  When Click on sort icon in "Created" table cell
#  When Click on the "Xóa" button in the "_@Name@_" table line

PL_35 Verify the sort function when click on sort icon in "Tên Post" column
  [Tags]                                                                                                Sort                          News                        Slug
  Create a test post in "News" list with "A" in post name
  Create a test post in "News" list with "Z" in post name
  When Click on sort icon in "Tên Post" table cell
  Then "A" should be visible in the first table line
  Then "Z" should not be visible in the first table line
  When Click on sort icon in "Tên Post" table cell
  Then "A" should not be visible in the first table line
  Then "Z" should be visible in the first table line
  When Click on sort icon in "Tên Post" table cell
  When Click on the "Xóa" button in the "Z" table line
  When Click on the "Xóa" button in the "A" table line

PL_36 Verify the sort function when click on sort icon in "Slug" column
  [Tags]                                                                                                Sort                          News                        Slug
  ${Post}=                 Create a test post in "News" list with "A" in slug
  Create a test post in "News" list with "Z" in slug
  When Click on sort icon in "Slug" table cell
  Then "${Post}" should be visible in the first table line
  Then "_@Name@_" should not be visible in the first table line
  When Click on sort icon in "Slug" table cell
  Then "${Post}" should not be visible in the first table line
  Then "_@Name@_" should be visible in the first table line
  When Click on sort icon in "Slug" table cell
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Post}" table line

#PL_37 Verify the sort function when click on sort icon in "Tên Post" column
#  [Tags]                                                                                                Sort                          News                        Slug   BUG3
#  Create a test post in "News" list
#  When Click on sort icon in "Created" table cell
#  Then "_@Name@_" should not be visible in the first table line
#  When Click on sort icon in "Created" table cell
#  Then "_@Name@_" should be visible in the first table line
#  When Click on sort icon in "Created" table cell
#  When Click on the "Xóa" button in the "_@Name@_" table line

### Verify that edit the post information ###
## Verify that edit post's information page of "Projects" list ##
PL_38 Verify the UI of the editing post page in "Projects" list (ENGLISH tab)
  [Tags]                                                                                                EditInfo                        Projects
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Heading should contain "Chỉnh sửa post Projects" inner text
  Then Webpage should contain "Created At" input field
  Then Webpage should contain "Thumbnail Url" image upload field
  Then Webpage should contain "ENGLISH" tab
  Then Webpage should contain "Name" input field
  Then Webpage should contain "Slug" input field
  Then Webpage should contain "Description" input field
  Then Webpage should contain "Content" input field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_38_2 Verify the UI of the editing post page in "Projects" list (VIETNAM tab)
  [Tags]                                                                                                EditInfo                          Projects
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Heading should contain "Chỉnh sửa post Projects" inner text
  Then Webpage should contain "Created At" input field
  Then Webpage should contain "Thumbnail Url" image upload field
  Then Webpage should contain "ENGLISH" tab
  Then Webpage should contain "Name" input field
  Then Webpage should contain "Slug" input field
  Then Webpage should contain "Description" input field
  Then Webpage should contain "Content" input field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_39 Verity that change the post's information by entering the valid data in "Created At" field
  [Tags]                                                                                                EditInfo                        Projects                      Valid
  ${yesterday}=                                                                                         Get Current Date                local                         -1 day                                     result_format=%d-%m-%Y
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click "date" in "Created At" with "yesterday"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Data's information in "Created At" should be equal "${yesterday}"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_40 Verity that change the post's information by entering the valid data in "Thumbnail Url" field
  [Tags]                                                                                                EditInfo                        Projects                      Valid
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${before}=                     Get the image's information in "Thumbnail Url" field
  When Click on cross icon inside image in "Thumbnail Url"
  When Select file in "Thumbnail Url" with "image2.jpg"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${after}=                      Get the image's information in "Thumbnail Url" field
  Then Should Not Be Equal       ${after}    ${before}
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

#PL_41 Verity that change the post's information by entering the valid data in "Tên Post" field (VIETNAM tab)
#  [Tags]                                                                                                EditInfo                        Projects                      Valid   BUG2
#  Create a test post in "Projects" list
#  When Click on the "Sửa" button in the "_@Name@_" table line
#  When Click on "VIETNAM" tab
#  When Enter "test name" in "Name" with "_RANDOM_"
#  When Click "Lưu lại" button
#  Then User look message "Cập nhật thành công" popup
#  Then "_@Name@_" should be visible in the table line
#  When Click on the "Xóa" button in the "_@Name@_" table line

PL_42 Verity that change the post's information by entering the valid data in "Name" field (ENGLISH tab)
  [Tags]                                                                                                EditInfo                        Projects                      Valid
  ${Post}=                            Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "${Post}" table line
  When Click on "ENGLISH" tab
  Then Data's information in "Name" should be equal "_@Name@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Post}" table line

PL_43 Verity that change the post's information by entering the valid data in "Slug" field (VIETNAM tab)
  [Tags]                                                                                                EditInfo                        Projects                      Valid
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in "Slug" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  Then Data's information in "Slug" should be equal "_@Slug@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_44 Verity that change the post's information by entering the valid data in "Slug" field (ENGLISH tab)
  [Tags]                                                                                                EditInfo                        Projects                      Valid
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in "Slug" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  Then Data's information in "Slug" should be equal "_@Slug@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_45 Verity that change the post's information by entering the valid data in "Description" field (VIETNAM tab)
  [Tags]                                                                                                EditInfo                        Projects                      Valid
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  Then Data's information in "Description" should be equal "_@Description@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_46 Verity that change the post's information by entering the valid data in "Description" field (ENGLISH tab)
  [Tags]                                                                                                EditInfo                        Projects                      Valid
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  Then Data's information in "Description" should be equal "_@Description@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_47 Verity that change the post's information by entering the valid data in "Content" field (VIETNAM tab)
  [Tags]                                                                                                EditInfo                        Projects                      Valid
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  Then Data's information in "Content" should be equal "_@Content@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_48 Verity that change the post's information by entering the valid data in "Content" field (ENGLISH tab)
  [Tags]                                                                                                EditInfo                        Projects                      Valid
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  Then Data's information in "Content" should be equal "_@Content@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_49 Verity that change the post's information by entering the existent data in "Name" field (VIETNAM tab)
  [Tags]                                                                                                EditInfo                        Projects                      Invalid
  ${Post}=                   Create a test post in "Projects" list
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "${Post}" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_@Name@_"
  When Click "Lưu lại" button
  Then User look message "Tên đã tồn tại" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Post}" table line
  When Click on the "Xóa" button in the "_@Name@_" table line

#PL_50 Verity that change the post's information by entering the same data in "Name" field of 2 tab
#  [Tags]                                                                                                EditInfo                        Projects                      Invalid   BUG1
#  Create a test post in "Projects" list
#  When Click on the "Sửa" button in the "_@Name@_" table line
#  When Click on "ENGLISH" tab
#  When Enter "test name" in "Name" with "_@Name@_"
#  When Click "Lưu lại" button
#  Then User look message "Trùng lặp đa ngôn ngữ trùng" popup
#  When Click "Huỷ bỏ" button
#  When Click on the "Xóa" button in the "_@Name@_" table line

PL_51 Verify the "Huỷ bỏ" button in the edit post's information page
  [Tags]                                                                                                EditInfo                        Projects                      Button
  ${Post}=                   Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Huỷ bỏ" button
  Then "_@Name@_" should not be visible in the table line
  When Click on the "Xóa" button in the "${Post}" table line

PL_52 Verify the "Huỷ bỏ" button in the edit post's information page
  [Tags]                                                                                                EditInfo                        Projects                      Button
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

# PL_53 Verify the "Lưu và tạo mới" button in the edit post's information page
#   [Tags]                                                                                                EditInfo                        Projects                      Button

PL_54 Verity that change the post's information by leaving the blank field in "Created At" field
  [Tags]                                                                                                EditInfo                        Projects                      BlankField
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on cross icon in select "Created At"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chọn created at" displayed under "Created At" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

#PL_55 Verity that change the post's information by leaving the blank field in "Thumbnail Url" field
#  [Tags]                                                                                                EditInfo                        Projects                      BlankField   BUG3
#  Create a test post in "Projects" list
#  When Click on the "Sửa" button in the "_@Name@_" table line
#  When Click on cross icon inside image in "Thumbnail Url"
#  When Click "Lưu lại" button
#  Then User look message "Xin vui lòng cập nhật Thumbnail Url post" popup
#  When Click "Huỷ bỏ" button
#  When Click on the "Xóa" button in the "_@Name@_" table line

PL_56 Verity that change the post's information by leaving the blank field in "Tên Post" field
  [Tags]                                                                                                EditInfo                        Projects                      BlankField
  ${Post}=                 Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Post}" table line

PL_57 Verity that change the post's information by leaving the blank field in "Name" field
  [Tags]                                                                                                EditInfo                        Projects                      BlankField
  ${Post}=                 Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Post}" table line

PL_58 Verity that change the post's information by leaving the blank field in "Slug" field (VIETNAM tab)
  [Tags]                                                                                                EditInfo                        Projects                      BlankField
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in "Slug" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập slug" displayed under "Slug" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_59 Verity that change the post's information by leaving the blank field in "Slug" field (ENGLISH tab)
  [Tags]                                                                                                EditInfo                        Projects                      BlankField
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in "Slug" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập slug" displayed under "Slug" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_60 Verity that change the post's information by leaving the blank field in "Description" field
  [Tags]                                                                                                EditInfo                        Projects                      BlankField
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in textarea "Description" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_61 Verity that change the post's information by leaving the blank field in "Description" field
  [Tags]                                                                                                EditInfo                        Projects                      BlankField
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in textarea "Description" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_62 Verity that change the post's information by leaving the blank field in "Content" field
  [Tags]                                                                                                EditInfo                        Projects                      BlankField
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in editor "Content" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_63 Verity that change the post's information by leaving the blank field in "Content" field
  [Tags]                                                                                                EditInfo                        Projects                      BlankField
  Create a test post in "Projects" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in editor "Content" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify that edit post's information page of "News" list ##
PL_64 Verify the UI of the editing post page in "News" list (ENGLISH tab)
  [Tags]                                                                                                EditInfo                        News
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Heading should contain "Chỉnh sửa post News" inner text
  Then Webpage should contain "Created At" input field
  Then Webpage should contain "Thumbnail Url" image upload field
  Then Webpage should contain "ENGLISH" tab
  Then Webpage should contain "Name" input field
  Then Webpage should contain "Slug" input field
  Then Webpage should contain "Description" input field
  Then Webpage should contain "Content" input field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

# PL_64_2 Verify the UI of the editing post page in "News" list (VIETNAM tab)
#   [Tags]                                                                                                EditInfo                          News
#   Create a test post in "News" list
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   Then Heading should contain "Chỉnh sửa post News" inner text
#   Then Webpage should contain "Created At" input field
#   Then Webpage should contain "Thumbnail Url" image upload field
#   Then Webpage should contain "ENGLISH" tab
#   Then Webpage should contain "Name" input field
#   Then Webpage should contain "Slug" input field
#   Then Webpage should contain "Description" input field
#   Then Webpage should contain "Content" input field
#   Then Webpage should contain "Lưu lại" button
#   Then Webpage should contain "Lưu và tạo mới" button
#   Then Webpage should contain "Huỷ bỏ" button
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "_@Name@_" table line

PL_65 Verity that change the post's information by entering the valid data in "Created At" field
  [Tags]                                                                                                EditInfo                        News                      Valid
  ${yesterday}=                                                                                         Get Current Date                local                         -1 day                                     result_format=%d-%m-%Y
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click "date" in "Created At" with "yesterday"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Data's information in "Created At" should be equal "${yesterday}"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_66 Verity that change the post's information by entering the valid data in "Thumbnail Url" field
  [Tags]                                                                                                EditInfo                        News                      Valid
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${before}=                     Get the image's information in "Thumbnail Url" field
  When Click on cross icon inside image in "Thumbnail Url"
  When Select file in "Thumbnail Url" with "image2.jpg"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${after}=                      Get the image's information in "Thumbnail Url" field
  Then Should Not Be Equal       ${after}    ${before}
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_67 Verity that change the post's information by entering the valid data in "Tên Post" field (VIETNAM tab)
  [Tags]                                                                                                EditInfo                        News                      Valid
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_68 Verity that change the post's information by entering the valid data in "Name" field (ENGLISH tab)
  [Tags]                                                                                                EditInfo                        News                      Valid
  ${Post}=                            Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "${Post}" table line
  When Click on "ENGLISH" tab
  Then Data's information in "Name" should be equal "_@Name@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Post}" table line

PL_69 Verity that change the post's information by entering the valid data in "Slug" field (VIETNAM tab)
  [Tags]                                                                                                EditInfo                        News                      Valid
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in "Slug" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  Then Data's information in "Slug" should be equal "_@Slug@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_70 Verity that change the post's information by entering the valid data in "Slug" field (ENGLISH tab)
  [Tags]                                                                                                EditInfo                        News                      Valid
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in "Slug" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  Then Data's information in "Slug" should be equal "_@Slug@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_71 Verity that change the post's information by entering the valid data in "Description" field (VIETNAM tab)
  [Tags]                                                                                                EditInfo                        News                      Valid
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  Then Data's information in "Description" should be equal "_@Description@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_72 Verity that change the post's information by entering the valid data in "Description" field (ENGLISH tab)
  [Tags]                                                                                                EditInfo                        News                      Valid
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  Then Data's information in "Description" should be equal "_@Description@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_73 Verity that change the post's information by entering the valid data in "Content" field (VIETNAM tab)
  [Tags]                                                                                                EditInfo                        News                      Valid
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  Then Data's information in "Content" should be equal "_@Content@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_74 Verity that change the post's information by entering the valid data in "Content" field (ENGLISH tab)
  [Tags]                                                                                                EditInfo                        News                      Valid
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  Then Data's information in "Content" should be equal "_@Content@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

#PL_76 Verity that change the post's information by entering the existent data in "Name" field (VIETNAM tab)
#  [Tags]                                                                                                EditInfo                        News                      Invalid   BUG3
#  ${Post}=                   Create a test post in "News" list
#  Create a test post in "News" list
#  When Click on the "Sửa" button in the "${Post}" table line
#  When Click on "VIETNAM" tab
#  When Enter "test name" in "Name" with "_@Name@_"
#  When Click "Lưu lại" button
#  Then User look message "Tên đã tồn tại" popup
#  When Click "Huỷ bỏ" button
#  When Click on the "Xóa" button in the "${Post}" table line
#  When Click on the "Xóa" button in the "_@Name@_" table line
#
#PL_76 Verity that change the post's information by entering the same data in "Name" field of 2 tab
#  [Tags]                                                                                                EditInfo                        News                      Invalid   BUG3
#  Create a test post in "News" list
#  When Click on the "Sửa" button in the "_@Name@_" table line
#  When Click on "ENGLISH" tab
#  When Enter "test name" in "Name" with "_@Name@_"
#  When Click "Lưu lại" button
#  Then User look message "Trùng lặp đa ngôn ngữ trùng" popup
#  When Click "Huỷ bỏ" button
#  When Click on the "Xóa" button in the "_@Name@_" table line

PL_77 Verify the "Huỷ bỏ" button in the edit post's information page
  [Tags]                                                                                                EditInfo                        News                      Button
  ${Post}=                   Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Huỷ bỏ" button
  Then "_@Name@_" should not be visible in the table line
  When Click on the "Xóa" button in the "${Post}" table line

#PL_78 Verify the "Huỷ bỏ" button in the edit post's information page
#  [Tags]                                                                                                EditInfo                        News                      Button   BUG3
#  Create a test post in "News" list
#  When Click on the "Sửa" button in the "_@Name@_" table line
#  When Enter "test name" in "Name" with "_RANDOM_"
#  When Click "Lưu lại" button
#  Then User look message "Cập nhật thành công" popup
#  Then "_@Name@_" should be visible in the table line
#  When Click on the "Xóa" button in the "_@Name@_" table line

# PL_79 Verify the "Lưu và tạo mới" button in the edit post's information page
#   [Tags]                                                                                                EditInfo                        News                      Button

PL_80 Verity that change the post's information by leaving the blank field in "Created At" field
  [Tags]                                                                                                EditInfo                        News                      BlankField
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on cross icon in select "Created At"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chọn created at" displayed under "Created At" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

#PL_81 Verity that change the post's information by leaving the blank field in "Thumbnail Url" field
#  [Tags]                                                                                                EditInfo                        News                      BlankField   BUG3
#  Create a test post in "News" list
#  When Click on the "Sửa" button in the "_@Name@_" table line
#  When Click on cross icon inside image in "Thumbnail Url"
#  When Click "Lưu lại" button
#  Then User look message "Xin vui lòng cập nhật Thumbnail Url post" popup
#  When Click "Huỷ bỏ" button
#  When Click on the "Xóa" button in the "_@Name@_" table line

PL_82 Verity that change the post's information by leaving the blank field in "Tên Post" field
  [Tags]                                                                                                EditInfo                        News                      BlankField
  ${Post}=                 Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Post}" table line

PL_83 Verity that change the post's information by leaving the blank field in "Name" field
  [Tags]                                                                                                EditInfo                        News                      BlankField
  ${Post}=                 Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Post}" table line

PL_84 Verity that change the post's information by leaving the blank field in "Slug" field (VIETNAM tab)
  [Tags]                                                                                                EditInfo                        News                      BlankField
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in "Slug" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập slug" displayed under "Slug" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_85 Verity that change the post's information by leaving the blank field in "Slug" field (ENGLISH tab)
  [Tags]                                                                                                EditInfo                        News                      BlankField
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in "Slug" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập slug" displayed under "Slug" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_86 Verity that change the post's information by leaving the blank field in "Description" field
  [Tags]                                                                                                EditInfo                        News                      BlankField
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in textarea "Description" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_87 Verity that change the post's information by leaving the blank field in "Description" field
  [Tags]                                                                                                EditInfo                        News                      BlankField
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in textarea "Description" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_88 Verity that change the post's information by leaving the blank field in "Content" field
  [Tags]                                                                                                EditInfo                        News                      BlankField
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in editor "Content" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_89 Verity that change the post's information by leaving the blank field in "Content" field
  [Tags]                                                                                                EditInfo                        News                      BlankField
  Create a test post in "News" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in editor "Content" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

### Verify that create the post ###
## Verify that create post page of "Projects" list ##
PL_90 Verify the UI of the creating post page in "Projects" list
  [Tags]                                                                                                Create                       Projects                      UI
  Go to "Danh sách post" page with "Projects" list
  When Click "Tạo mới" button
  When Heading should contain "Tạo mới post Projects" inner text
  When Webpage should contain "Created At" input field
  When Webpage should contain "Thumbnail Url" image upload field
  When Webpage should contain "ENGLISH" tab
  When Webpage should contain "Name" input field
  When Webpage should contain "Slug" input field
  When Webpage should contain "Description" input field
  When Webpage should contain "Content" input field
  When Webpage should contain "Lưu lại" button
  When Webpage should contain "Lưu và tạo mới" button
  When Webpage should contain "Huỷ bỏ" button

# PL_90_02 Verify the UI of the creating post page in "Projects" list
#   [Tags]                                                                                                Create                        Projects                      UI
#   Go to "Danh sách post" page with "Projects" list
#   When Click "Tạo mới" button
#   When Heading should contain "Chỉnh sửa post Projects" inner text
#   When Webpage should contain "Created At" input field
#   When Webpage should contain "Thumbnail Url" image upload field
#   When Webpage should contain "ENGLISH" tab
#   When Webpage should contain "Name" input field
#   When Webpage should contain "Slug" input field
#   When Webpage should contain "Description" input field
#   When Webpage should contain "Content" input field
#   When Webpage should contain "Lưu lại" button
#   When Webpage should contain "Lưu và tạo mới" button
#   When Webpage should contain "Huỷ bỏ" button

PL_91 Verity that create the new post by entering the valid data
  [Tags]                                                                                                Create                       Projects                      Valid
  Go to "Danh sách post" page with "Projects" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Select file in "Thumbnail Url" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_92 Verity that create the new post by entering the valid data
  [Tags]                                                                                                Create                       Projects                      Invalid
  Go to "Danh sách post" page with "Projects" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Select file in "Thumbnail Url" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

#PL_92_02 Verity that create the new post by entering the valid data
#  [Tags]                                                                                                Create                       Projects                      Invalid   BUG3
#  Go to "Danh sách post" page with "Projects" list
#  When Click "Tạo mới" button
#  When Click "date" in "Created At" with "today"
#  When Select file in "Thumbnail Url" with "image.jpg"
#  When Click on "ENGLISH" tab
#  When Enter "test name" in "Name" with "_RANDOM_"
#  When Enter "text" in "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click on "VIETNAM" tab
#  When Enter "test name" in "Name" with "_@Name@_"
#  When Enter "text" in "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click "Lưu lại" button
#  Then User look message "Trùng lặp đa ngôn ngữ trùng" popup

PL_93 Verify the "Huỷ bỏ" button in the create new post page
  [Tags]                                                                                                Create                       Projects                      Button
  Go to "Danh sách post" page with "Projects" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Select file in "Thumbnail Url" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Huỷ bỏ" button
  Then "_@Name@_" should not be visible in the table line

PL_94 Verify the "Lưu lại" button in the create new post page
  [Tags]                                                                                                Create                       Projects                      Button
  Go to "Danh sách post" page with "Projects" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Select file in "Thumbnail Url" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

# PL_95 Verify the "Lưu lại" button in the create new post page
#   [Tags]                                                                                                Create                       Projects                      Button

#PL_96 Verity that create the new post by leaving the blank field in "Created At" field
#  [Tags]                                                                                                Create                       Projects                      BlankField   BUG3
#  Go to "Danh sách post" page with "Projects" list
#  When Click "Tạo mới" button
#  When Select file in "Thumbnail Url" with "image.jpg"
#  When Click on "ENGLISH" tab
#  When Enter "test name" in "Name" with "_RANDOM_"
#  When Enter "text" in "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click on "VIETNAM" tab
#  When Enter "test name" in "Name" with "_RANDOM_"
#  When Enter "text" in textarea "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click "Lưu lại" button
#  Then User look message "Xin vui lòng nhập ngày tạo" popup

#PL_97 Verity that create the new post by leaving the blank field in "Thumbnail Url" field
#  [Tags]                                                                                                Create                       Projects                      BlankField   BUG3
#  Go to "Danh sách post" page with "Projects" list
#  When Click "Tạo mới" button
#  When Click "date" in "Created At" with "today"
#  When Click on "ENGLISH" tab
#  When Enter "test name" in "Name" with "_RANDOM_"
#  When Enter "text" in "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click on "VIETNAM" tab
#  When Enter "test name" in "Name" with "_RANDOM_"
#  When Enter "text" in textarea "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click "Lưu lại" button
#  Then User look message "Xin vui lòng cập nhật Thumbnail Url" popup
#
#PL_98 Verity that create the new post by leaving the blank field in "Tên Post" field
#  [Tags]                                                                                                Create                       Projects                      BlankField   BUG3
#  Go to "Danh sách post" page with "Projects" list
#  When Click "Tạo mới" button
#  When Click "date" in "Created At" with "today"
#  When Click on "ENGLISH" tab
#  When Enter "test name" in "Name" with "_RANDOM_"
#  When Enter "text" in "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click on "VIETNAM" tab
#  When Enter "text" in textarea "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click "Lưu lại" button
#  Then Required message "Xin vui lòng nhập name" displayed under "Name" field

PL_99 Verity that create the new post by leaving the blank field in "Name" field
  [Tags]                                                                                                Create                       Projects                      BlankField
  Go to "Danh sách post" page with "Projects" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "ENGLISH" tab
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field

PL_100 Verity that create the new post by leaving the blank field in "Description" field
  [Tags]                                                                                                Create                       Projects                      BlankField
  Go to "Danh sách post" page with "Projects" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_101 Verity that create the new post by leaving the blank field in "Description" field
  [Tags]                                                                                                Create                       Projects                      BlankField
  Go to "Danh sách post" page with "Projects" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_102 Verity that create the new post by leaving the blank field in "Content" field
  [Tags]                                                                                                Create                       Projects                      BlankField
  Go to "Danh sách post" page with "Projects" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_103 Verity that create the new post by leaving the blank field in "Content" field
  [Tags]                                                                                                Create                       Projects                      BlankField
  Go to "Danh sách post" page with "Projects" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify that create post page of "News" list ##
PL_104 Verify the UI of the creating post page in "News" list
  [Tags]                                                                                                Create                       News                      UI
  Go to "Danh sách post" page with "News" list
  When Click "Tạo mới" button
  When Heading should contain "Tạo mới post News" inner text
  When Webpage should contain "Created At" input field
  When Webpage should contain "Thumbnail Url" image upload field
  When Webpage should contain "ENGLISH" tab
  When Webpage should contain "Name" input field
  When Webpage should contain "Slug" input field
  When Webpage should contain "Description" input field
  When Webpage should contain "Content" input field
  When Webpage should contain "Lưu lại" button
  When Webpage should contain "Lưu và tạo mới" button
  When Webpage should contain "Huỷ bỏ" button

# PL_104_02 Verify the UI of the creating post page in "News" list
#   [Tags]                                                                                                Create                        News                      UI
#   Go to "Danh sách post" page with "News" list
#   When Click "Tạo mới" button
#   When Heading should contain "Chỉnh sửa post News" inner text
#   When Webpage should contain "Created At" input field
#   When Webpage should contain "Thumbnail Url" image upload field
#   When Webpage should contain "ENGLISH" tab
#   When Webpage should contain "Name" input field
#   When Webpage should contain "Slug" input field
#   When Webpage should contain "Description" input field
#   When Webpage should contain "Content" input field
#   When Webpage should contain "Lưu lại" button
#   When Webpage should contain "Lưu và tạo mới" button
#   When Webpage should contain "Huỷ bỏ" button

PL_105 Verity that create the new post by entering the valid data
  [Tags]                                                                                                Create                       News                      Valid
  Go to "Danh sách post" page with "News" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Select file in "Thumbnail Url" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_106 Verity that create the new post by entering the valid data
  [Tags]                                                                                                Create                       News                      Invalid
  Go to "Danh sách post" page with "News" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Select file in "Thumbnail Url" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

#PL_106_02 Verity that create the new post by entering the valid data
#  [Tags]                                                                                                Create                       News                      Invalid   BUG3
#  Go to "Danh sách post" page with "News" list
#  When Click "Tạo mới" button
#  When Click "date" in "Created At" with "today"
#  When Select file in "Thumbnail Url" with "image.jpg"
#  When Click on "ENGLISH" tab
#  When Enter "test name" in "Name" with "_RANDOM_"
#  When Enter "text" in "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click on "VIETNAM" tab
#  When Enter "test name" in "Name" with "_@Name@_"
#  When Enter "text" in "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click "Lưu lại" button
#  Then User look message "Trùng lặp đa ngôn ngữ trùng" popup

PL_107 Verify the "Huỷ bỏ" button in the create new post page
  [Tags]                                                                                                Create                       News                      Button
  Go to "Danh sách post" page with "News" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Select file in "Thumbnail Url" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Huỷ bỏ" button
  Then "_@Name@_" should not be visible in the table line

PL_108 Verify the "Lưu lại" button in the create new post page
  [Tags]                                                                                                Create                       News                      Button
  Go to "Danh sách post" page with "News" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Select file in "Thumbnail Url" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

# PL_109 Verify the "Lưu lại" button in the create new post page
#   [Tags]                                                                                                Create                       News                      Button

#PL_110 Verity that create the new post by leaving the blank field in "Created At" field
#  [Tags]                                                                                                Create                       News                      BlankField   BUG3
#  Go to "Danh sách post" page with "News" list
#  When Click "Tạo mới" button
#  When Select file in "Thumbnail Url" with "image.jpg"
#  When Click on "ENGLISH" tab
#  When Enter "test name" in "Name" with "_RANDOM_"
#  When Enter "text" in "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click on "VIETNAM" tab
#  When Enter "test name" in "Name" with "_RANDOM_"
#  When Enter "text" in textarea "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click "Lưu lại" button
#  Then User look message "Xin vui lòng nhập ngày tạo" popup

#PL_111 Verity that create the new post by leaving the blank field in "Thumbnail Url" field
#  [Tags]                                                                                                Create                       News                      BlankField   BUG3
#  Go to "Danh sách post" page with "News" list
#  When Click "Tạo mới" button
#  When Click "date" in "Created At" with "today"
#  When Click on "ENGLISH" tab
#  When Enter "test name" in "Name" with "_RANDOM_"
#  When Enter "text" in "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click on "VIETNAM" tab
#  When Enter "test name" in "Name" with "_RANDOM_"
#  When Enter "text" in textarea "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click "Lưu lại" button
#  Then User look message "Xin vui lòng cập nhật Thumbnail Url" popup

#PL_112 Verity that create the new post by leaving the blank field in "Tên Post" field
#  [Tags]                                                                                                Create                       News                      BlankField   BUG3
#  Go to "Danh sách post" page with "News" list
#  When Click "Tạo mới" button
#  When Click "date" in "Created At" with "today"
#  When Click on "ENGLISH" tab
#  When Enter "test name" in "Name" with "_RANDOM_"
#  When Enter "text" in "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click on "VIETNAM" tab
#  When Enter "text" in textarea "Description" with "_RANDOM_"
#  When Enter "text" in editor "Content" with "_RANDOM_"
#  When Click "Lưu lại" button
#  Then Required message "Xin vui lòng nhập name" displayed under "Name" field

PL_113 Verity that create the new post by leaving the blank field in "Name" field
  [Tags]                                                                                                Create                       News                      BlankField
  Go to "Danh sách post" page with "News" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "ENGLISH" tab
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field

PL_114 Verity that create the new post by leaving the blank field in "Description" field
  [Tags]                                                                                                Create                       News                      BlankField
  Go to "Danh sách post" page with "News" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_115 Verity that create the new post by leaving the blank field in "Description" field
  [Tags]                                                                                                Create                       News                      BlankField
  Go to "Danh sách post" page with "News" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_116 Verity that create the new post by leaving the blank field in "Content" field
  [Tags]                                                                                                Create                       News                      BlankField
  Go to "Danh sách post" page with "News" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_117 Verity that create the new post by leaving the blank field in "Content" field
  [Tags]                                                                                                Create                       News                      BlankField
  Go to "Danh sách post" page with "News" list
  When Click "Tạo mới" button
  When Click "date" in "Created At" with "today"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

### Verify that delete post ###
PL_118 Verify the delete post function
  [Tags]                                                                                                Create                       Projects                      Delete
  Create a test post in "Projects" list
  When Click on the "Xóa" button in the "_@Name@_" table line
  Then User look message "Xóa thành công" popup
  Then "_@Name@_" should not be visible in the table line

PL_119 Verify the cancel action button when delete post
  [Tags]                                                                                                Create                       Projects                      Delete
  Create a test post in "Projects" list
  When Click on the "Xóa" button in the "_@Name@_" table line with cancel
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

PL_120 Verify the delete post function
  [Tags]                                                                                                Create                       News                      Delete
  Create a test post in "News" list
  When Click on the "Xóa" button in the "_@Name@_" table line
  Then User look message "Xóa thành công" popup
  Then "_@Name@_" should not be visible in the table line

PL_121 Verify the cancel action button when delete post
  [Tags]                                                                                                Create                       News                      Delete
  Create a test post in "News" list
  When Click on the "Xóa" button in the "_@Name@_" table line with cancel
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

*** Keywords ***
Go to "Danh sách post" page with "${category}" list
  Login to admin
  Click "Thiết lập" menu
  Click "Post" sub menu to "/#/vn/setting/post"
  Select on the "${category}" item line

### Post ###
Create a test post in "${category}" list
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Post" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "${category}" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách post" page with "${category}" list
    Click "Tạo mới" button
  END
  Click "date" in "Created At" with "today"
  Select file in "Thumbnail Url" with "image.jpg"
  Click on "ENGLISH" tab
  Enter "test name" in "Name" with "_RANDOM_"
  Enter "paragraph" in textarea "Description" with "_RANDOM_"
  Enter "paragraph" in editor "Content" with "_RANDOM_"
  Click on "VIETNAM" tab
  Enter "test name" in "Name" with "_RANDOM_"
    ${name}=               Check Text                               _@Name@_
  Enter "paragraph" in textarea "Description" with "_RANDOM_"
  Enter "paragraph" in editor "Content" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test post in "${category}" list with "${name}" in post name
  ${name}=                 Get Random Text                          test name                 ${name}
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Post" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "${category}" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách post" page with "${category}" list
    Click "Tạo mới" button
  END
  Click "date" in "Created At" with "today"
  Select file in "Thumbnail Url" with "image.jpg"
  Click on "ENGLISH" tab
  Enter "test name" in "Name" with "_RANDOM_"
  Enter "paragraph" in textarea "Description" with "_RANDOM_"
  Enter "paragraph" in editor "Content" with "_RANDOM_"
  Click on "VIETNAM" tab
  Enter "test name" in "Name" with "${name}"
  Enter "paragraph" in textarea "Description" with "_RANDOM_"
  Enter "paragraph" in editor "Content" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test post in "${category}" list with ${slug} in slug
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Post" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "${category}" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách post" page with "${category}" list
    Click "Tạo mới" button
  END
  Click "date" in "Created At" with "today"
  Select file in "Thumbnail Url" with "image.jpg"
  Click on "ENGLISH" tab
  Enter "test name" in "Name" with "_RANDOM_"
  Enter "paragraph" in textarea "Description" with "_RANDOM_"
  Enter "paragraph" in editor "Content" with "_RANDOM_"
  Click on "VIETNAM" tab
  Enter "test name" in "Name" with "_RANDOM_"
    ${name}=               Check Text                                _@Name@_
  Enter "text" in "Slug" with "${slug}"
  Enter "paragraph" in textarea "Description" with "_RANDOM_"
  Enter "paragraph" in editor "Content" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}
