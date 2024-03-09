*** Settings ***
Resource               ../keywords/common.robot
Test Setup             Setup
Test Teardown          Tear Down
Library                DateTime

*** Test Cases ***
### Link to testcases https://docs.google.com/spreadsheets/d/1R_jW5GBVBaMy7YgNKJQ2Ha5xW12Vn0nRzOHE0-OsyF8/edit#gid=778615548 ###
PC_01 Verify the User Interface of "Danh sách Mã" page
  [Tags]                                                                                                MainPage                   UI                     Smoketest
  Login to admin
  When Click "Thiết lập" menu
  When Click "Mã" sub menu to "/#/vn/setting/code"
  Then Heading should contain "Danh sách Mã" inner text
  Then Confirm locating exactly in "Mã" page of "Thiết lập" menu
  Then Webpage should contain the list data from database
  Then Webpage should contain the search function
  Then Webpage should contain "Mã" column with sort and search function
  Then Webpage should contain "Tên mã" column with sort and search function
  Then Webpage should contain "Created" column with sort and search function
  Then Webpage should contain "Type Code" group
  Then Webpage should contain "Thêm mới" button

#PC_02 Verify the function changing the number of codes show in each list
#  [Tags]                                                                                                MainPage                   UI    BUG
#  Login to admin
#  When Click "Thiết lập" menu
#  When Click "Mã" sub menu to "/#/vn/setting/code"
#  When Click on "second" selection to change the number of data show in list and check
#  When Click on "third" selection to change the number of data show in list and check
#  When Click on "fourth" selection to change the number of data show in list and check
#  When Click on "fifth" selection to change the number of data show in list and check

PC_03 Verify the function of changing the page's number the list of codes
  [Tags]                                                                                                MainPage                   UI
  Go to "Danh sách Mã" page
  Then Check the amount of page list
       ${Last_name}=                                                                                    Get data in the last row
  When Create a test data
  When Move to the "next" page
       ${First_name}=                                                                                   Get data in the last row
  Then Should Be Equal                                                                                  ${First_name}              ${Last_name}
  When Move to the "previous" page
  When Click on the "Xóa" button in the "_@Tên mã@_" table line
  When Move to the last page and check

PC_04 Verify the highlight table line function after operated
  [Tags]                                                                                                MainPage                   UI
  Go to "Danh sách Mã" page
  Create a test data
  When Click on the "Sửa" button in the "_@Tên mã@_" table line
  When Click "Huỷ bỏ" button
  Then "_@Tên mã@_" table line should be highlighted
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

### Verify the activate function ###
PC_05 Verify that switch off code when click on "Đã kích hoạt" button
  [Tags]                                                                                                Activate
  Create a test data
  When Click on the "Đã kích hoạt" button in the "_@Tên mã@_" table line
  Then User look message "Cập nhật thành công" popup
  Then The status button in the "_@Tên mã@_" table line should change to "Đã vô hiệu hóa"
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

PC_06 Verify that activate code when click on "Đã vô hiệu hóa" button
  [Tags]                                                                                                Activate
  Create a test data
  When Click on the "Đã kích hoạt" button in the "_@Tên mã@_" table line
  Then User look message "Cập nhật thành công" popup
  When Click on the "Đã vô hiệu hóa" button in the "_@Tên mã@_" table line
  Then User look message "Cập nhật thành công" popup
  Then The status button in the "_@Tên mã@_" table line should change to "Đã kích hoạt"
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

### Verify the search function ###
PC_07 Verify the function of input search box
  [Tags]                                                                                                Search
  ${Code}=                                                                                              Create a test data
  Create a test data
  When Enter "text" in placeholder "Tìm kiếm" with "${Code}"
  Then "${Code}" should be visible in the table line
  Then "_@Tên mã@_" should not be visible in the table line
  When Click on the "Xóa" button in the "${Code}" table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  Then "_@Tên mã@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

PC_08 Verify the function of input search box
  [Tags]                                                                                                Search
  Create a test data
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  Then Table line should show empty
  When Click on cross icon in input search box
  Then "_@Tên mã@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

PC_09 Verify the function of input search box when cancel action
  [Tags]                                                                                                Search
  ${Code}                                                                                               Create a test data
  Create a test data
  When Enter "text" in placeholder "Tìm kiếm" with "${Code}"
  Then "${Code}" should be visible in the table line
  Then "_@Tên mã@_" should not be visible in the table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  Then "_@Tên mã@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Tên mã@_" table line
  When Click on the "Xóa" button in the "${Code}" table line

PC_10 Verify the search function of the magnifier icon in "Mã" column
  [Tags]                                                                                                Search                                Code
  Create a test data with "T1" code type
  Create a test data with "T2" code type
  When Click on magnifier icon in "Mã" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "T1"
  When Click "Tìm kiếm" button
  Then "T1" should be visible in the table line
  Then "T2" should not be visible in the table line
  When Click on the "Xóa" button in the "T1" table line
  When Click on magnifier icon in "Mã" table cell
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "T2" table line

PC_11 Verify the search function of the magnifier icon in "Mã" column by entering a "Mã" that was not existed
  [Tags]                                                                                                Search
  Create a test data
  When Click on magnifier icon in "Mã" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "_RANDOM_"
  When Click "Tìm kiếm" button
  Then Table line should show empty
  When Click on magnifier icon in "Mã" table cell
  When Click "Cài lại" button
  Then "_@Tên mã@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

PC_12 Verify the search function of the magnifier icon in "Mã" column when cancel action with "Cài lại" button
  [Tags]                                                                                                Search                                Code
  Create a test data with "T1" code type
  Create a test data with "T2" code type
  When Click on magnifier icon in "Mã" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "T1"
  When Click "Tìm kiếm" button
  Then "T1" should be visible in the table line
  Then "T2" should not be visible in the table line
  When Click on magnifier icon in "Mã" table cell
  When Click "Cài lại" button
  Then "T2" should be visible in the table line
  When Click on the "Xóa" button in the "T2" table line
  When Click on the "Xóa" button in the "T1" table line

PC_13 Verify the search function of the magnifier icon in "Tên mã" column
  [Tags]                                                                                                Search                                Name
  ${Name}=                                                                                              Create a test data
  Create a test data
  When Click on magnifier icon in "Tên mã" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "_@Tên mã@_"
  When Click "Tìm kiếm" button
  Then "_@Tên mã@_" should be visible in the table line
  Then "${Name}" should not be visible in the table line
  When Click on magnifier icon in "Tên mã" table cell
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "_@Tên mã@_" table line
  When Click on the "Xóa" button in the "${Name}" table line

PC_14 Verify the search function of the magnifier icon in "Mã" column when cancel action with "Cài lại" button
  [Tags]                                                                                                Search                                Name
  Create a test data
  When Click on magnifier icon in "Tên mã" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "_RANDOM_"
  When Click "Tìm kiếm" button
  Then Table line should show empty
  When Click on magnifier icon in "Tên mã" table cell
  When Click "Cài lại" button
  Then "_@Tên mã@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

PC_15 Verify the search function of the magnifier icon in "Tên mã" column when cancel action with "Cài lại" button
  [Tags]                                                                                                Search                                Name
  ${Name}=                                                                                              Create a test data
  Create a test data
  When Click on magnifier icon in "Tên mã" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "_@Tên mã@_"
  When Click "Tìm kiếm" button
  Then "_@Tên mã@_" should be visible in the table line
  Then "${Name}" should not be visible in the table line
  When Click on the "Xóa" button in the "_@Tên mã@_" table line
  When Click on magnifier icon in "Tên mã" table cell
  When Click "Cài lại" button
  Then "${Name}" should be visible in the table line
  When Click on the "Xóa" button in the "${Name}" table line

PC_16 Verify the search by date function of the calendar icon in "Created" column
  [Tags]                                                                                                Search                                Created
  ${Name}=                                                                                              Create a test data
  Create a test data
  When Click on calendar icon in "Created" table cell
  When Enter "date" in placeholder "Ngày bắt đầu" with "today"
  When Enter "date" in placeholder "Ngày kết thúc" with "today"
  When Click "Tìm kiếm" button
  Then "_@Tên mã@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

### Verify the sort function ###
#PC_17 Verify the sort function when click on sort icon in "Mã" column
#  [Tags]                                                                                                Sort    BUG
#  Create a test data with "A" code name
#  Create a test data with "Z" code name
#  When Click on sort icon in "Mã" table cell
#  Then "A" should be visible in the first table line
#  Then "Z" should not be visible in the first table line
#  When Click on sort icon in "Mã" table cell
#  Then "A" should not be visible in the first table line
#  Then "Z" should be visible in the first table line
#  When Click on sort icon in "Mã" table cell
#  When Click on the "Xóa" button in the "Z" table line
#  When Click on the "Xóa" button in the "A" table line
#
#PC_18 Verify the sort function when click on sort icon in "Tên mã" column
#  [Tags]                                                                                                Sort    BUG
#  Create a test data with "A" code name
#  Create a test data with "Z" code name
#  When Click on sort icon in "Tên mã" table cell
#  Then "A" should be visible in the first table line
#  Then "Z" should not be visible in the first table line
#  When Click on sort icon in "Tên mã" table cell
#  Then "A" should not be visible in the first table line
#  Then "Z" should be visible in the first table line
#  When Click on sort icon in "Tên mã" table cell
#  When Click on the "Xóa" button in the "Z" table line
#  When Click on the "Xóa" button in the "A" table line
#
#PC_19 Verify the sort function when click on sort icon in "Created" column
#  [Tags]                                                                                                Sort
#  ${Data}=                                                                                              Create a test data
#  Create a test data
#  When Click on sort icon in "Created" table cell
#  Then "_@Tên mã@_" should be visible in the first table line
#  When Click on sort icon in "Created" table cell
#  Then "_@Tên mã@_" should not be visible in the first table line
#  When Click on sort icon in "Created" table cell
#  When Click on the "Xóa" button in the "_@Tên mã@_" table line
#  When Click on the "Xóa" button in the "${Data}" table line

### Verify that edit the code's information ###
PC_20 Verify the User Interface in edit code's information page
  [Tags]                                                                                                EditInfo                                UI
  Create a test data
  When Click on the "Sửa" button in the "_@Tên mã@_" table line
  Then Heading should contain "Chỉnh sửa mã Position" inner text
  Then Webpage should contain "Tên mã" input field
  Then Webpage should contain "Mã" input field
  Then Webpage should contain "Mô tả" input field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

PC_21 Verity that change the code's information by entering the valid data in "tên mã" field
  [Tags]                                                                                                EditInfo                                Valid
  Create a test data
  When Click on the "Sửa" button in the "_@Tên mã@_" table line
  When Enter "test name" in "Tên mã" with "_RANDOM_"
  When Enter "paragraph" in textarea "Mô tả" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Tên mã@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

PC_22 Verity that change the code's information by entering the valid data in "Mã" field
  [Tags]                                                                                                EditInfo                                Valid
  Create a test data
  When Click on the "Sửa" button in the "_@Tên mã@_" table line
  When Enter "word" in "Mã" with "_RANDOM_"
  When Enter "paragraph" in textarea "Mô tả" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Mã@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

PC_23 Verity that change the code's information by entering the valid data in "Mã" field
  [Tags]                                                                                                EditInfo                                BlankField
  ${TestCode1}=                                                                                         Create a test data
  When Click on the "Sửa" button in the "_@Tên mã@_" table line
  When Enter "test name" in "Tên mã" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập tên mã" displayed under "Tên mã" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${TestCode1}" table line

PC_24 Verity that change the code's information by leaving the blank field in "Mã"
  [Tags]                                                                                                EditInfo                                BlankField
  Create a test data
  When Click on the "Sửa" button in the "_@Tên mã@_" table line
  When Enter "word" in "Mã" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập mã" displayed under "Mã" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

PC_25 Verity that change the code's information by leaving the blank field in "Mô tả"
  [Tags]                                                                                                EditInfo                                BlankField
  Create a test data
  When Click on the "Sửa" button in the "_@Tên mã@_" table line
  When Enter "paragraph" in textarea "Mô tả" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

### Verify that create a new position code ###
PC_26 Verify the User Interface in code creation page
  [Tags]                                                                                                Create                                  UI
  Go to "Danh sách Mã" page
  When Click "Thêm mới" button
  Then Heading should contain "Thêm mới mã Position" inner text
  Then Webpage should contain "Tên mã" input field
  Then Webpage should contain "Mã" input field
  Then Webpage should contain "Mô tả" input field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button

PC_27 Verify that create a new position code with valid data
  [Tags]                                                                                                Create                                  Valid
  Go to "Danh sách Mã" page
  When Click "Thêm mới" button
  When Enter "test name" in "Tên mã" with "_RANDOM_"
  When Enter "word" in "Mã" with "_RANDOM_"
  When Enter "paragraph" in textarea "Mô tả" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  Then "_@Mã@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

PC_28 Verify the create function when leave a blank field in "Tên mã"
  [Tags]                                                                                                Create                                  BlankField
  Go to "Danh sách Mã" page
  When Click "Thêm mới" button
  When Enter "word" in "Mã" with "_RANDOM_"
  When Enter "paragraph" in textarea "Mô tả" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập tên mã" displayed under "Tên mã" field

PC_29 Verify the create function when leave a blank field in "Mã"
  [Tags]                                                                                                Create                                  BlankField
  Go to "Danh sách Mã" page
  When Click "Thêm mới" button
  When Enter "test name" in "Tên mã" with "_RANDOM_"
  When Enter "word" in "Mã" with ""
  When Enter "paragraph" in textarea "Mô tả" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập mã" displayed under "Mã" field

PC_30 Verify the create function when leave a blank field in "Mô tả"
  [Tags]                                                                                                Create                                  BlankField
  Go to "Danh sách Mã" page
  When Click "Thêm mới" button
  When Enter "test name" in "Tên mã" with "_RANDOM_"
  When Enter "word" in "Mã" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

### Verify the delete code function ###
PC_31 Verify the delete code function
  [Tags]                                                                                                Delete
  Create a test data
  When Click on the "Xóa" button in the "_@Tên mã@_" table line
  Then User look message "Xóa thành công" popup
  Then "_@Tên mã@_" should not be visible in the table line

PC_32 Verify the cancel action button when delete code
  [Tags]                                                                                                Delete
  Create a test data
  When Click on the "Xóa" button in the "_@Tên mã@_" table line with cancel
  Then "_@Tên mã@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Tên mã@_" table line

*** Keywords ***
Go to "Danh sách Mã" page
  Login to admin
  Click "Thiết lập" menu
  Click "Mã" sub menu to "/#/vn/setting/code"

Create a test data
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Mã" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Click "Thêm mới" button
  ELSE
    Go to "Danh sách Mã" page
    Click "Thêm mới" button
  END
  Enter "test name" in "Tên mã" with "_RANDOM_"
    ${name}=               Check Text                               _@Tên mã@_
  Enter "word" in "Mã" with "_RANDOM_"
  Enter "paragraph" in textarea "Mô tả" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test data with "${name}" code name
  ${name}                  Get Random Text                          test name            ${name}
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Mã" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Click "Thêm mới" button
  ELSE
    Go to "Danh sách Mã" page
    Click "Thêm mới" button
  END
  Enter "test name" in "Tên mã" with "${name}"
  # Enter "word" in "Mã" with "_RANDOM_"
  Enter "paragraph" in textarea "Mô tả" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test data with "${code}" code type
  ${code}                  Get Random Text                          word                  ${code}
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Mã" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Click "Thêm mới" button
  ELSE
    Go to "Danh sách Mã" page
    Click "Thêm mới" button
  END
  Enter "test name" in "Tên mã" with "_RANDOM_"
    ${name}=               Check Text                               _@Tên mã@_
  Enter "word" in "Mã" with "${code}"
  Enter "paragraph" in textarea "Mô tả" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}
