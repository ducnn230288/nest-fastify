*** Settings ***
Resource               ../keywords/common.robot
Test Setup             Setup
Test Teardown          Tear Down
Library                DateTime

*** Test Cases ***
### Link to testcases https://docs.google.com/spreadsheets/d/1R_jW5GBVBaMy7YgNKJQ2Ha5xW12Vn0nRzOHE0-OsyF8/edit#gid=1432644075 ###
DL_01 Verify the User Interface of the 'Danh sách Dữ liệu' page
  [Tags]                                                                                                MainPage                   UI                     Smoketest
  Login to admin
  When Click "Thiết lập" menu
  When Click "Dữ liệu" sub menu to "/#/vn/setting/data"
  Then Heading should contain "Danh sách Dữ liệu" inner text
  Then Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  Then Webpage should contain the list data from database
  Then Webpage should contain the search function
  Then Webpage should contain "Tên dữ liệu" column with sort and search function
  Then Webpage should contain "Order" column with sort and search function
  Then Webpage should contain "Created" column with sort and search function
  Then Webpage should contain "Tạo mới" button

DL_02 Verify the function changing the number of data types show in each list
  [Tags]                                                                                                MainPage                   Partner
  Login to admin
  When Click "Thiết lập" menu
  When Click "Dữ liệu" sub menu to "/#/vn/setting/data"
  When Select on the "Partner" item line
  Then Click on "second" selection to change the number of data show in list and check
  Then Click on "third" selection to change the number of data show in list and check
  Then Click on "fourth" selection to change the number of data show in list and check
  Then Click on "fifth" selection to change the number of data show in list and check

DL_03 Verify the function of changing the page's number the list of data types
  [Tags]                                                                                                MainPage                   Partner
  Go to "Danh sách Dữ liệu" page with "Partner" list
  Then Check the amount of page list
       ${Last_name}=            Get data in the last row
  When Create a test data type in "Partner" list
  When Move to the "next" page
       ${First_name}=           Get data in the first row
  Then Should Be Equal          ${First_name}    ${Last_name}
  When Move to the "perious" page
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Move to the last page and check

DL_04 Verify the highlight table line function after operated
  [Tags]                                                                                                MainPage                   Partner
  Create a test data type in "Partner" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click "Huỷ bỏ" button
  Then "_@Name@_" table line should be highlighted
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_05 Verify the function changing the number of data types show in each list
  [Tags]                                                                                                MainPage                   Tech
  Login to admin
  When Click "Thiết lập" menu
  When Click "Dữ liệu" sub menu to "/#/vn/setting/data"
  When Select on the "Tech" item line
  Then Click on "second" selection to change the number of data show in list and check
  Then Click on "third" selection to change the number of data show in list and check
  Then Click on "fourth" selection to change the number of data show in list and check
  Then Click on "fifth" selection to change the number of data show in list and check

DL_06 Verify the function of changing the page's number the list of data types
  [Tags]                                                                                                MainPage                   Tech
  Go to "Danh sách Dữ liệu" page with "Tech" list
  Then Check the amount of page list
       ${Last_name}=            Get data in the last row
  When Create a test data type in "Tech" list
  When Move to the "next" page
       ${First_name}=           Get data in the first row
  Then Should Be Equal          ${First_name}    ${Last_name}
  When Move to the "perious" page
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Move to the last page and check

DL_07 Verify the highlight table line function after operated
  [Tags]                                                                                                MainPage                   Tech
  Create a test data type in "Tech" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click "Huỷ bỏ" button
  Then "_@Name@_" table line should be highlighted
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_08 Verify the function changing the number of data types show in each list
  [Tags]                                                                                                MainPage                   Member
  Login to admin
  When Click "Thiết lập" menu
  When Click "Dữ liệu" sub menu to "/#/vn/setting/data"
  When Select on the "Member" item line
  Then Click on "second" selection to change the number of data show in list and check
  Then Click on "third" selection to change the number of data show in list and check
  Then Click on "fourth" selection to change the number of data show in list and check
  Then Click on "fifth" selection to change the number of data show in list and check

DL_09 Verify the function of changing the page's number the list of data types
  [Tags]                                                                                                MainPage                   Member
  Go to "Danh sách Dữ liệu" page with "Member" list
  Then Check the amount of page list
       ${Last_name}=            Get data in the last row
  When Create a test data type in "Member" list
  When Move to the "next" page
       ${First_name}=           Get data in the first row
  Then Should Be Equal          ${First_name}    ${Last_name}
  When Move to the "perious" page
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Move to the last page and check

DL_10 Verify the highlight table line function after operated
  [Tags]                                                                                                MainPage                   Member
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click "Huỷ bỏ" button
  Then "_@Name@_" table line should be highlighted
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_11 Verify the function changing the number of data types show in each list
  [Tags]                                                                                                MainPage                   Value
  Login to admin
  When Click "Thiết lập" menu
  When Click "Dữ liệu" sub menu to "/#/vn/setting/data"
  When Select on the "Value" item line
  Then Click on "second" selection to change the number of data show in list and check
  Then Click on "third" selection to change the number of data show in list and check
  Then Click on "fourth" selection to change the number of data show in list and check
  Then Click on "fifth" selection to change the number of data show in list and check

DL_12 Verify the function of changing the page's number the list of data types
  [Tags]                                                                                                MainPage                   Value
  Go to "Danh sách Dữ liệu" page with "Value" list
  Then Check the amount of page list
       ${Last_name}=            Get data in the last row
  When Create a test data type in "Value" list
  When Move to the "next" page
       ${First_name}=           Get data in the first row
  Then Should Be Equal          ${First_name}    ${Last_name}
  When Move to the "perious" page
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Move to the last page and check

DL_13 Verify the highlight table line function after operated
  [Tags]                                                                                                MainPage                   Value
  Create a test data type in "Value" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click "Huỷ bỏ" button
  Then "_@Name@_" table line should be highlighted
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_14 Verify the function changing the number of data types show in each list
  [Tags]                                                                                                MainPage                   Services
  Login to admin
  When Click "Thiết lập" menu
  When Click "Dữ liệu" sub menu to "/#/vn/setting/data"
  When Select on the "Services" item line
  Then Click on "second" selection to change the number of data show in list and check
  Then Click on "third" selection to change the number of data show in list and check
  Then Click on "fourth" selection to change the number of data show in list and check
  Then Click on "fifth" selection to change the number of data show in list and check

# DL_15 Verify the function of changing the page's number the list of data types
#   [Tags]                                                                                                MainPage                   Services
#   Go to "Danh sách Dữ liệu" page with "Services" list
#   Then Check the amount of page list
#        ${Last_name}=            Get data in the last row
#   When Create a test data type in "Services" list
#   When Move to the "next" page
#        ${First_name}=           Get data in the first row
#   Then Should Be Equal          ${First_name}    ${Last_name}
#   When Move to the "perious" page
#   When Click on the "Xóa" button in the "_@Name@_" table line
#   When Move to the last page and check

# DL_16 Verify the highlight table line function after operated
#   [Tags]                                                                                                MainPage                   Services
#   Create a test data type in "Services" list
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   When Click "Huỷ bỏ" button
#   Then "_@Name@_" table line should be highlighted
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_17 Verify the function changing the number of data types show in each list
  [Tags]                                                                                                MainPage                   Mission
  Login to admin
  When Click "Thiết lập" menu
  When Click "Dữ liệu" sub menu to "/#/vn/setting/data"
  When Select on the "Mission" item line
  Then Click on "second" selection to change the number of data show in list and check
  Then Click on "third" selection to change the number of data show in list and check
  Then Click on "fourth" selection to change the number of data show in list and check
  Then Click on "fifth" selection to change the number of data show in list and check

# DL_18 Verify the function of changing the page's number the list of data types
#   [Tags]                                                                                                MainPage                   Mission
#   Go to "Danh sách Dữ liệu" page with "Mission" list
#   Then Check the amount of page list
#        ${Last_name}=            Get data in the last row
#   When Create a test data type in "Mission" list
#   When Move to the "next" page
#        ${First_name}=           Get data in the first row
#   Then Should Be Equal          ${First_name}    ${Last_name}
#   When Move to the "perious" page
#   When Click on the "Xóa" button in the "_@Name@_" table line
#   When Move to the last page and check

# DL_19 Verify the highlight table line function after operated
#   [Tags]                                                                                                MainPage                   Mission
#   Create a test data type in "Mission" list
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   When Click "Huỷ bỏ" button
#   Then "_@Name@_" table line should be highlighted
#   When Click on the "Xóa" button in the "_@Name@_" table line

### Verify the activate function ###
DL_20 Verify that switch off data type when click on "Đã kích hoạt" button
  [Tags]                                                                                                Activate                   Partner
  Create a test data type in "Partner" list
  When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
  Then User look message "Cập nhật thành công" popup
  Then The status button in the "_@Name@_" table line change to "Đã vô hiệu hóa"
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_21 Verify that activate data type when click on "Đã vô hiệu hóa" button
#   [Tags]                                                                                                Activate                   Partner
#   Create a test data type in "Partner" list
#   When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
#   When Click on the "Đã vô hiệu hóa" button in the "_@Name@_" table line
#   Then User look message "Cập nhật thành công" popup
#   Then The status button in the "_@Name@_" table line change to "Đã kích hoạt"
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_22 Verify that switch off data type when click on "Đã kích hoạt" button
  [Tags]                                                                                                Activate                   Tech
  Create a test data type in "Tech" list
  When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
  Then User look message "Cập nhật thành công" popup
  Then The status button in the "_@Name@_" table line change to "Đã vô hiệu hóa"
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_23 Verify that activate data type when click on "Đã vô hiệu hóa" button
#   [Tags]                                                                                                Activate                   Tech
#   Create a test data type in "Tech" list
#   When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
#   When Click on the "Đã vô hiệu hóa" button in the "_@Name@_" table line
#   Then User look message "Cập nhật thành công" popup
#   Then The status button in the "_@Name@_" table line change to "Đã kích hoạt"
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_24 Verify that switch off data type when click on "Đã kích hoạt" button
  [Tags]                                                                                                Activate                   Member
  Create a test data type in "Member" list
  When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
  Then User look message "Cập nhật thành công" popup
  Then The status button in the "_@Name@_" table line change to "Đã vô hiệu hóa"
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_25 Verify that activate data type when click on "Đã vô hiệu hóa" button
#   [Tags]                                                                                                Activate                   Member
#   Create a test data type in "Member" list
#   When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
#   When Click on the "Đã vô hiệu hóa" button in the "_@Name@_" table line
#   Then User look message "Cập nhật thành công" popup
#   Then The status button in the "_@Name@_" table line change to "Đã kích hoạt"
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_26 Verify that switch off data type when click on "Đã kích hoạt" button
  [Tags]                                                                                                Activate                   Value
  Create a test data type in "Value" list
  When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
  Then User look message "Cập nhật thành công" popup
  Then The status button in the "_@Name@_" table line change to "Đã vô hiệu hóa"
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_27 Verify that activate data type when click on "Đã vô hiệu hóa" button
#   [Tags]                                                                                                Activate                   Value
#   Create a test data type in "Value" list
#   When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
#   When Click on the "Đã vô hiệu hóa" button in the "_@Name@_" table line
#   Then User look message "Cập nhật thành công" popup
#   Then The status button in the "_@Name@_" table line change to "Đã kích hoạt"
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_28 Verify that switch off data type when click on "Đã kích hoạt" button
  [Tags]                                                                                                Activate                   Services
  Create a test data type in "Services" list
  When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
  Then User look message "Cập nhật thành công" popup
  Then The status button in the "_@Name@_" table line change to "Đã vô hiệu hóa"
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_29 Verify that activate data type when click on "Đã vô hiệu hóa" button
#   [Tags]                                                                                                Activate                   Services
#   Create a test data type in "Services" list
#   When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
#   When Click on the "Đã vô hiệu hóa" button in the "_@Name@_" table line
#   Then User look message "Cập nhật thành công" popup
#   Then The status button in the "_@Name@_" table line change to "Đã kích hoạt"
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_30 Verify that switch off data type when click on "Đã kích hoạt" button
  [Tags]                                                                                                Activate                   Mission
  Create a test data type in "Mission" list
  When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
  Then User look message "Cập nhật thành công" popup
  Then The status button in the "_@Name@_" table line change to "Đã vô hiệu hóa"
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_31 Verify that activate data type when click on "Đã vô hiệu hóa" button
#   [Tags]                                                                                                Activate                   Mission
#   Create a test data type in "Mission" list
#   When Click on the "Đã kích hoạt" button in the "_@Name@_" table line
#   When Click on the "Đã vô hiệu hóa" button in the "_@Name@_" table line
#   Then User look message "Cập nhật thành công" popup
#   Then The status button in the "_@Name@_" table line change to "Đã kích hoạt"
#   When Click on the "Xóa" button in the "_@Name@_" table line

### Verify the search function ###
### Verify the search function in "Partner" list ###
DL_32 Verify the function of input search box
  [Tags]                                                                                                Search                     Partner
  Create a test data type in "Partner" list with "DataType1" in data name
  Create a test data type in "Partner" list with "DataType2" in data name
  When Enter "text" in placeholder "Tìm kiếm" with "DataType1"
  Then "DataType1" should be visible in the table line
  Then "DataType2" should not be visible in the table line
  When Click on the "Xóa" button in the "DataType1" table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  When Click on the "Xóa" button in the "DataType2" table line

DL_33 Verify the function of input search box with the code name that was not existed
  [Tags]                                                                                                Search                     Partner
  Create a test data type in "Partner" list
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  Then Table line should show empty
  When Click on cross icon in input search box
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_34 Verify the function of input search box when cancel action
  [Tags]                                                                                                Search                     Partner
  Create a test data type in "Partner" list with "Data1" in data name
  Create a test data type in "Partner" list with "Data2" in data name
  When Enter "text" in placeholder "Tìm kiếm" with "Data1"
  Then "Data1" should be visible in the table line
  Then "Data2" should not be visible in the table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  Then "Data2" should be visible in the table line
  When Click on the "Xóa" button in the "Data2" table line
  When Click on the "Xóa" button in the "Data1" table line

DL_35 Verify the search function of the magnifier icon in "Name" column
  [Tags]                                                                                                Search                     Partner
  Create a test data type in "Partner" list with "Data1" in data name
  Create a test data type in "Partner" list with "Data2" in data name
  When Click on magnifier icon in "Tên dữ liệu" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "Data1"
  Then "Data1" should be visible in the table line
  Then "Data2" should not be visible in the table line
  When Click on the "Xóa" button in the "Data1" table line
  When Click on magnifier icon in "Tên dữ liệu" table cell
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "Data2" table line

DL_36 Verify the "Cài lại" button after used the search function by clicking on magnifier icon in "Tên dữ liệu" cell
  [Tags]                                                                                                Search                     Partner
  ${Data1}=                                                                                             Create a test data type in "Partner" list
  Create a test data type in "Partner" list
  When Click on magnifier icon in "Tên dữ liệu" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_@Name@_"
  Then "_@Name@_" should be visible in the table line
  Then "${Data1}" should not be visible in the table line
  When Click on magnifier icon in "Tên dữ liệu" table cell
  When Click "Cài lại" button
  Then "${Data1}" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_37 Verify the search function of the magnifier icon in "Tên dữ liệu" column by entering a "Tên dữ liệu" that was not existed
  [Tags]                                                                                                Search                     Partner                DataName
  Create a test data type in "Partner" list
  When Click on magnifier icon in "Tên dữ liệu" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  Then Table line should show empty
  When Click on magnifier icon in "Tên dữ liệu" table cell
  When Click "Cài lại" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_38 Verify the search function of the magnifier icon in "Order" column
  [Tags]                                                                                                Search                     Partner                Order
  ${Data1}=                                                                                             Create a test data type in "Partner" list with "9999" in order
  Create a test data type in "Partner" list with "DataType2" in data name
  When Click on magnifier icon in "Order" table cell
  When Enter "number" in placeholder "Tìm kiếm" with "9999"
  Then "${Data1}" should be visible in the table line
  Then "DataType2" should not be visible in the table line
  When Click on the "Xóa" button in the "${Data1}" table line
  When Click on magnifier icon in "Order" table cell
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "DataType2" table line

DL_39 Verify the "Cài lại" button after used the search function by clicking on magnifier icon in "Order" cell
  [Tags]                                                                                                Search                     Partner                Order
  ${Data1}=                                                                                             Create a test data type in "Partner" list
  Create a test data type in "Partner" list
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_@Order@_"
  Then "_@Name@_" should be visible in the table line
  Then "${Data1}" should not be visible in the table line
  When Click on magnifier icon in "Order" table cell
  When Click "Cài lại" button
  Then "${Data1}" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_40 Verify the search function of the magnifier icon in "Name" column by entering a "Order" that was not existed
  [Tags]                                                                                                Search                     Partner                Order
  Create a test data type in "Partner" list
  When Click on magnifier icon in "Order" table cell
  When Enter "number" in placeholder "Tìm kiếm" with "_RANDOM_"
  Then Table line should show empty
  When Click on magnifier icon in "Order" table cell
  When Click "Cài lại" button
  Then "_@Name@_" should be visible in the table line

DL_41 Verify the search by date function of the calendar icon in "Created" column
  [Tags]                                                                                                Search                     Partner                Order
  Create a test data type in "Partner" list
  When Click on calendar icon in "Created" table cell
  When Enter "date" in placeholder "Ngày bắt đầu" with "today"
  When Enter "date" in placeholder "Ngày kết thúc" with "today"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

### Verify the search function in "Tech" list ###
DL_42 Verify the function of input search box
  [Tags]                                                                                                Search                     Tech    BUG
  Create a test data type in "Tech" list with "DataType1" in data name
  Create a test data type in "Tech" list with "DataType2" in data name
  When Enter "text" in placeholder "Tìm kiếm" with "DataType1"
  Then "DataType1" should be visible in the table line
  Then "DataType2" should not be visible in the table line
  When Click on the "Xóa" button in the "DataType1" table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  When Click on the "Xóa" button in the "DataType2" table line

DL_43 Verify the function of input search box with the code name that was not existed
  [Tags]                                                                                                Search                     Tech    BUG
  Create a test data type in "Tech" list
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  Then Table line should show empty
  When Click on cross icon in input search box
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_44 Verify the function of input search box when cancel action
  [Tags]                                                                                                Search                     Tech    BUG
  Create a test data type in "Tech" list with "Data1" in data name
  Create a test data type in "Tech" list with "Data2" in data name
  When Enter "text" in placeholder "Tìm kiếm" with "Data1"
  Then "Data1" should be visible in the table line
  Then "Data2" should not be visible in the table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  Then "Data2" should be visible in the table line
  When Click on the "Xóa" button in the "Data2" table line
  When Click on the "Xóa" button in the "Data1" table line

DL_45 Verify the search function of the magnifier icon in "Name" column
  [Tags]                                                                                                Search                     Tech    BUG
  Create a test data type in "Tech" list with "DataType1" in data name
  Create a test data type in "Tech" list with "DataType2" in data name
  When Click on magnifier icon in "Name" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "Data1"
  When Click "Tìm kiếm" button
  Then "Data1" should be visible in the table line
  Then "Data2" should not be visible in the table line
  When Click on the "Xóa" button in the "Data1" table line
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "Data2" table line

DL_46 Verify the "Cài lại" button after used the search function by clicking on magnifier icon in "Name" cell
  [Tags]                                                                                                Search                     Tech    BUG
  ${Data1}=                                                                                             Create a test data type in "Tech" list
  Create a test data type in "Tech" list
  When Click on magnifier icon in "Name" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_@Name@_"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  Then "${Data1}" should not be visible in the table line
  When Click "Cài lại" button
  Then "${Data1}" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_47 Verify the search function of the magnifier icon in "Name" column by entering a "Name" that was not existed
  [Tags]                                                                                                Search                     Tech                DataName    BUG
  Create a test data type in "Tech" list
  When Click on magnifier icon in "Name" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  When Click "Tìm kiếm" button
  Then Table line should show empty
  When Click "Cài lại" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_48 Verify the search function of the magnifier icon in "Order" column
  [Tags]                                                                                                Search                     Tech                Order    BUG
  Create a test data type in "Tech" list with "DataType1" in data name
  Create a test data type in "Tech" list with "DataType2" in data name
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "DataType1"
  When Click "Tìm kiếm" button
  Then "DataType1" should be visible in the table line
  Then "DataType2" should not be visible in the table line
  When Click on the "Xóa" button in the "DataType1" table line
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "DataType2" table line

DL_49 Verify the "Cài lại" button after used the search function by clicking on magnifier icon in "Order" cell
  [Tags]                                                                                                Search                     Tech                Order    BUG
  ${Data1}=                                                                                             Create a test data type in "Tech" list
  Create a test data type in "Tech" list
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_@Order@_"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  Then "${Data1}" should not be visible in the table line
  When Click "Cài lại" button
  Then "${Data1}" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_50 Verify the search function of the magnifier icon in "Name" column by entering a "Order" that was not existed
  [Tags]                                                                                                Search                     Tech                Order    BUG
  Create a test data type in "Tech" list
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  When Click "Tìm kiếm" button
  Then Table line should show empty
  When Click on the "Xóa" button in the "DataType1" table line
  When Click "Cài lại" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "DataType2" table line

DL_51 Verify the search by date function of the calendar icon in "Created" column
  [Tags]                                                                                                Search                     Tech                Order
  Create a test data type in "Tech" list
  When Click on calendar icon in "Created" table cell
  When Enter "date" in placeholder "Ngày bắt đầu" with "today"
  When Enter "date" in placeholder "Ngày kết thúc" with "today"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

### Verify the search function in "Member" list ###
DL_52 Verify the function of input search box
  [Tags]                                                                                                Search                     Member    BUG
  Create a test data type in "Member" list with "DataType1" in data name
  Create a test data type in "Member" list with "DataType2" in data name
  When Enter "text" in placeholder "Tìm kiếm" with "DataType1"
  Then "DataType1" should be visible in the table line
  Then "DataType2" should not be visible in the table line
  When Click on the "Xóa" button in the "DataType1" table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  When Click on the "Xóa" button in the "DataType2" table line

DL_53 Verify the function of input search box with the code name that was not existed
  [Tags]                                                                                                Search                     Member    BUG
  Create a test data type in "Member" list
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  Then Table line should show empty
  When Click on cross icon in input search box
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_54 Verify the function of input search box when cancel action
  [Tags]                                                                                                Search                     Member    BUG
  Create a test data type in "Member" list with "Data1" in data name
  Create a test data type in "Member" list with "Data2" in data name
  When Enter "text" in placeholder "Tìm kiếm" with "Data1"
  Then "Data1" should be visible in the table line
  Then "Data2" should not be visible in the table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  Then "Data2" should be visible in the table line
  When Click on the "Xóa" button in the "Data2" table line
  When Click on the "Xóa" button in the "Data1" table line

DL_55 Verify the search function of the magnifier icon in "Name" column
  [Tags]                                                                                                Search                     Member    BUG
  Create a test data type in "Member" list with "DataType1" in data name
  Create a test data type in "Member" list with "DataType2" in data name
  When Click on magnifier icon in "Name" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "Data1"
  When Click "Tìm kiếm" button
  Then "Data1" should be visible in the table line
  Then "Data2" should not be visible in the table line
  When Click on the "Xóa" button in the "Data1" table line
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "Data2" table line

DL_56 Verify the "Cài lại" button after used the search function by clicking on magnifier icon in "Name" cell
  [Tags]                                                                                                Search                     Member    BUG
  ${Data1}=                                                                                             Create a test data type in "Member" list
  Create a test data type in "Member" list
  When Click on magnifier icon in "Name" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_@Name@_"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  Then "${Data1}" should not be visible in the table line
  When Click "Cài lại" button
  Then "${Data1}" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_57 Verify the search function of the magnifier icon in "Name" column by entering a "Name" that was not existed
  [Tags]                                                                                                Search                     Member                DataName    BUG
  Create a test data type in "Member" list
  When Click on magnifier icon in "Name" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  When Click "Tìm kiếm" button
  Then Table line should show empty
  When Click "Cài lại" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_58 Verify the search function of the magnifier icon in "Order" column
  [Tags]                                                                                                Search                     Member                Order    BUG
  Create a test data type in "Member" list with "DataType1" in data name
  Create a test data type in "Member" list with "DataType2" in data name
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "DataType1"
  When Click "Tìm kiếm" button
  Then "DataType1" should be visible in the table line
  Then "DataType2" should not be visible in the table line
  When Click on the "Xóa" button in the "DataType1" table line
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "DataType2" table line

DL_59 Verify the "Cài lại" button after used the search function by clicking on magnifier icon in "Order" cell
  [Tags]                                                                                                Search                     Member                Order    BUG
  ${Data1}=                                                                                             Create a test data type in "Member" list
  Create a test data type in "Member" list
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_@Order@_"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  Then "${Data1}" should not be visible in the table line
  When Click "Cài lại" button
  Then "${Data1}" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_60 Verify the search function of the magnifier icon in "Name" column by entering a "Order" that was not existed
  [Tags]                                                                                                Search                     Member                Order    BUG
  Create a test data type in "Member" list
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  When Click "Tìm kiếm" button
  Then Table line should show empty
  When Click on the "Xóa" button in the "DataType1" table line
  When Click "Cài lại" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "DataType2" table line

DL_61 Verify the search by date function of the calendar icon in "Created" column
  [Tags]                                                                                                Search                     Member                Order
  Create a test data type in "Member" list
  When Click on calendar icon in "Created" table cell
  When Enter "date" in placeholder "Ngày bắt đầu" with "today"
  When Enter "date" in placeholder "Ngày kết thúc" with "today"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

### Verify the search function in "Value" list ###
DL_62 Verify the function of input search box
  [Tags]                                                                                                Search                     Value
  Create a test data type in "Value" list with "DataType1" in data name
  Create a test data type in "Value" list with "DataType2" in data name
  When Enter "text" in placeholder "Tìm kiếm" with "DataType1"
  Then "DataType1" should be visible in the table line
  Then "DataType2" should not be visible in the table line
  When Click on the "Xóa" button in the "DataType1" table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  When Click on the "Xóa" button in the "DataType2" table line

DL_63 Verify the function of input search box with the code name that was not existed
  [Tags]                                                                                                Search                     Value
  Create a test data type in "Value" list
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  Then Table line should show empty
  When Click on cross icon in input search box
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_64 Verify the function of input search box when cancel action
  [Tags]                                                                                                Search                     Value
  Create a test data type in "Value" list with "Data1" in data name
  Create a test data type in "Value" list with "Data2" in data name
  When Enter "text" in placeholder "Tìm kiếm" with "Data1"
  Then "Data1" should be visible in the table line
  Then "Data2" should not be visible in the table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  Then "Data2" should be visible in the table line
  When Click on the "Xóa" button in the "Data2" table line
  When Click on the "Xóa" button in the "Data1" table line

DL_65 Verify the search function of the magnifier icon in "Name" column
  [Tags]                                                                                                Search                     Value
  Create a test data type in "Value" list with "DataType1" in data name
  Create a test data type in "Value" list with "DataType2" in data name
  When Click on magnifier icon in "Name" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "Data1"
  When Click "Tìm kiếm" button
  Then "Data1" should be visible in the table line
  Then "Data2" should not be visible in the table line
  When Click on the "Xóa" button in the "Data1" table line
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "Data2" table line

DL_66 Verify the "Cài lại" button after used the search function by clicking on magnifier icon in "Name" cell
  [Tags]                                                                                                Search                     Value
  ${Data1}=                                                                                             Create a test data type in "Value" list
  Create a test data type in "Value" list
  When Click on magnifier icon in "Name" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_@Name@_"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  Then "${Data1}" should not be visible in the table line
  When Click "Cài lại" button
  Then "${Data1}" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_67 Verify the search function of the magnifier icon in "Name" column by entering a "Name" that was not existed
  [Tags]                                                                                                Search                     Value                DataName
  Create a test data type in "Value" list
  When Click on magnifier icon in "Name" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  When Click "Tìm kiếm" button
  Then Table line should show empty
  When Click "Cài lại" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_68 Verify the search function of the magnifier icon in "Order" column
  [Tags]                                                                                                Search                     Value                Order
  Create a test data type in "Value" list with "DataType1" in data name
  Create a test data type in "Value" list with "DataType2" in data name
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "DataType1"
  When Click "Tìm kiếm" button
  Then "DataType1" should be visible in the table line
  Then "DataType2" should not be visible in the table line
  When Click on the "Xóa" button in the "DataType1" table line
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "DataType2" table line

DL_69 Verify the "Cài lại" button after used the search function by clicking on magnifier icon in "Order" cell
  [Tags]                                                                                                Search                     Value                Order
  ${Data1}=                                                                                             Create a test data type in "Value" list
  Create a test data type in "Value" list
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_@Order@_"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  Then "${Data1}" should not be visible in the table line
  When Click "Cài lại" button
  Then "${Data1}" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_70 Verify the search function of the magnifier icon in "Name" column by entering a "Order" that was not existed
  [Tags]                                                                                                Search                     Value                Order
  Create a test data type in "Value" list
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  When Click "Tìm kiếm" button
  Then Table line should show empty
  When Click on the "Xóa" button in the "DataType1" table line
  When Click "Cài lại" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "DataType2" table line

DL_71 Verify the search by date function of the calendar icon in "Created" column
  [Tags]                                                                                                Search                     Value                Order
  Create a test data type in "Value" list
  When Click on calendar icon in "Created" table cell
  When Enter "date" in placeholder "Ngày bắt đầu" with "today"
  When Enter "date" in placeholder "Ngày kết thúc" with "today"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

### Verify the search function in "Services" list ###
DL_72 Verify the function of input search box
  [Tags]                                                                                                Search                     Services
  Create a test data type in "Services" list with "DataType1" in data name
  Create a test data type in "Services" list with "DataType2" in data name
  When Enter "text" in placeholder "Tìm kiếm" with "DataType1"
  Then "DataType1" should be visible in the table line
  Then "DataType2" should not be visible in the table line
  When Click on the "Xóa" button in the "DataType1" table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  When Click on the "Xóa" button in the "DataType2" table line

DL_73 Verify the function of input search box with the code name that was not existed
  [Tags]                                                                                                Search                     Services
  Create a test data type in "Services" list
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  Then Table line should show empty
  When Click on cross icon in input search box
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_74 Verify the function of input search box when cancel action
  [Tags]                                                                                                Search                     Services
  Create a test data type in "Services" list with "Data1" in data name
  Create a test data type in "Services" list with "Data2" in data name
  When Enter "text" in placeholder "Tìm kiếm" with "Data1"
  Then "Data1" should be visible in the table line
  Then "Data2" should not be visible in the table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  Then "Data2" should be visible in the table line
  When Click on the "Xóa" button in the "Data2" table line
  When Click on the "Xóa" button in the "Data1" table line

DL_75 Verify the search function of the magnifier icon in "Name" column
  [Tags]                                                                                                Search                     Services
  Create a test data type in "Services" list with "DataType1" in data name
  Create a test data type in "Services" list with "DataType2" in data name
  When Click on magnifier icon in "Name" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "Data1"
  When Click "Tìm kiếm" button
  Then "Data1" should be visible in the table line
  Then "Data2" should not be visible in the table line
  When Click on the "Xóa" button in the "Data1" table line
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "Data2" table line

DL_76 Verify the "Cài lại" button after used the search function by clicking on magnifier icon in "Name" cell
  [Tags]                                                                                                Search                     Services
  ${Data1}=                                                                                             Create a test data type in "Services" list
  Create a test data type in "Services" list
  When Click on magnifier icon in "Name" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_@Name@_"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  Then "${Data1}" should not be visible in the table line
  When Click "Cài lại" button
  Then "${Data1}" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_77 Verify the search function of the magnifier icon in "Name" column by entering a "Name" that was not existed
  [Tags]                                                                                                Search                     Services                DataName
  Create a test data type in "Services" list
  When Click on magnifier icon in "Name" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  When Click "Tìm kiếm" button
  Then Table line should show empty
  When Click "Cài lại" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_78 Verify the search function of the magnifier icon in "Order" column
  [Tags]                                                                                                Search                     Services                Order
  Create a test data type in "Services" list with "DataType1" in data name
  Create a test data type in "Services" list with "DataType2" in data name
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "DataType1"
  When Click "Tìm kiếm" button
  Then "DataType1" should be visible in the table line
  Then "DataType2" should not be visible in the table line
  When Click on the "Xóa" button in the "DataType1" table line
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "DataType2" table line

DL_79 Verify the "Cài lại" button after used the search function by clicking on magnifier icon in "Order" cell
  [Tags]                                                                                                Search                     Services                Order
  ${Data1}=                                                                                             Create a test data type in "Services" list
  Create a test data type in "Services" list
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_@Order@_"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  Then "${Data1}" should not be visible in the table line
  When Click "Cài lại" button
  Then "${Data1}" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_80 Verify the search function of the magnifier icon in "Name" column by entering a "Order" that was not existed
  [Tags]                                                                                                Search                     Services                Order
  Create a test data type in "Services" list
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  When Click "Tìm kiếm" button
  Then Table line should show empty
  When Click on the "Xóa" button in the "DataType1" table line
  When Click "Cài lại" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "DataType2" table line

DL_81 Verify the search by date function of the calendar icon in "Created" column
  [Tags]                                                                                                Search                     Services                Order
  Create a test data type in "Services" list
  When Click on calendar icon in "Created" table cell
  When Enter "date" in placeholder "Ngày bắt đầu" with "today"
  When Enter "date" in placeholder "Ngày kết thúc" with "today"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

### Verify the search function in "Mission" list ###
DL_82 Verify the function of input search box
  [Tags]                                                                                                Search                     Mission
  Create a test data type in "Mission" list with "DataType1" in data name
  Create a test data type in "Mission" list with "DataType2" in data name
  When Enter "text" in placeholder "Tìm kiếm" with "DataType1"
  Then "DataType1" should be visible in the table line
  Then "DataType2" should not be visible in the table line
  When Click on the "Xóa" button in the "DataType1" table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  When Click on the "Xóa" button in the "DataType2" table line

DL_83 Verify the function of input search box with the code name that was not existed
  [Tags]                                                                                                Search                     Mission
  Create a test data type in "Mission" list
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  Then Table line should show empty
  When Click on cross icon in input search box
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_84 Verify the function of input search box when cancel action
  [Tags]                                                                                                Search                     Mission
  Create a test data type in "Mission" list with "Data1" in data name
  Create a test data type in "Mission" list with "Data2" in data name
  When Enter "text" in placeholder "Tìm kiếm" with "Data1"
  Then "Data1" should be visible in the table line
  Then "Data2" should not be visible in the table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  Then "Data2" should be visible in the table line
  When Click on the "Xóa" button in the "Data2" table line
  When Click on the "Xóa" button in the "Data1" table line

DL_85 Verify the search function of the magnifier icon in "Name" column
  [Tags]                                                                                                Search                     Mission
  Create a test data type in "Mission" list with "DataType1" in data name
  Create a test data type in "Mission" list with "DataType2" in data name
  When Click on magnifier icon in "Name" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "Data1"
  When Click "Tìm kiếm" button
  Then "Data1" should be visible in the table line
  Then "Data2" should not be visible in the table line
  When Click on the "Xóa" button in the "Data1" table line
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "Data2" table line

DL_86 Verify the "Cài lại" button after used the search function by clicking on magnifier icon in "Name" cell
  [Tags]                                                                                                Search                     Mission
  ${Data1}=                                                                                             Create a test data type in "Mission" list
  Create a test data type in "Mission" list
  When Click on magnifier icon in "Name" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_@Name@_"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  Then "${Data1}" should not be visible in the table line
  When Click "Cài lại" button
  Then "${Data1}" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_87 Verify the search function of the magnifier icon in "Name" column by entering a "Name" that was not existed
  [Tags]                                                                                                Search                     Mission                DataName
  Create a test data type in "Mission" list
  When Click on magnifier icon in "Name" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  When Click "Tìm kiếm" button
  Then Table line should show empty
  When Click "Cài lại" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_88 Verify the search function of the magnifier icon in "Order" column
  [Tags]                                                                                                Search                     Mission                Order
  Create a test data type in "Mission" list with "DataType1" in data name
  Create a test data type in "Mission" list with "DataType2" in data name
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "DataType1"
  When Click "Tìm kiếm" button
  Then "DataType1" should be visible in the table line
  Then "DataType2" should not be visible in the table line
  When Click on the "Xóa" button in the "DataType1" table line
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "DataType2" table line

DL_89 Verify the "Cài lại" button after used the search function by clicking on magnifier icon in "Order" cell
  [Tags]                                                                                                Search                     Mission                Order
  ${Data1}=                                                                                             Create a test data type in "Mission" list
  Create a test data type in "Mission" list
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_@Order@_"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  Then "${Data1}" should not be visible in the table line
  When Click "Cài lại" button
  Then "${Data1}" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_90 Verify the search function of the magnifier icon in "Name" column by entering a "Order" that was not existed
  [Tags]                                                                                                Search                     Mission                Order
  Create a test data type in "Mission" list
  When Click on magnifier icon in "Order" table cell
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  When Click "Tìm kiếm" button
  Then Table line should show empty
  When Click on the "Xóa" button in the "DataType1" table line
  When Click "Cài lại" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "DataType2" table line

DL_91 Verify the search by date function of the calendar icon in "Created" column
  [Tags]                                                                                                Search                     Mission                Order
  Create a test data type in "Mission" list
  When Click on calendar icon in "Created" table cell
  When Enter "date" in placeholder "Ngày bắt đầu" with "today"
  When Enter "date" in placeholder "Ngày kết thúc" with "today"
  When Click "Tìm kiếm" button
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

### Verify the sort function ###
## Verify the sort function in "Partner" list ##
DL_92 Verify the sort function when click on sort icon in "Name" column
  [Tags]                                                                                                Sort                       Partner                 DataName
  Create a test data type in "Partner" list with "A" in data name
  Create a test data type in "Partner" list with "Z" in data name
  When Click on sort icon in "Name" table cell
  Then "A" should be visible in the first table line
  Then "Z" should not be visible in the first table line
  When Click on sort icon in "Name" table cell
  Then "A" should not be visible in the first table line
  Then "Z" should be visible in the first table line
  When Click on sort icon in "Name" table cell
  When Click on the "Xóa" button in the "Z" table line
  When Click on the "Xóa" button in the "A" table line

DL_93 Verify the sort function when click on sort icon in "Order" column
  [Tags]                                                                                                Sort                       Partner                 Order
  ${Data1}=                                                                                             Create a test data type in "Partner" list with "1" in order
  Create a test data type in "Partner" list with "999999999" in order
  When Click on sort icon in "Order" table cell
  Then "${Data1}" should be visible in the first table line
  Then "_@Name@_" should not be visible in the first table line
  When Click on sort icon in "Order" table cell
  Then "${Data1}" should not be visible in the first table line
  Then "_@Name@_" should be visible in the first table line
  When Click on sort icon in "Order" table cell
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_94 Verify the sort function when click on sort icon in "Order" column
  [Tags]                                                                                                Sort                       Partner                 Order
  Create a test data type in "Tech" list
  When Click on sort icon in "Created" table cell
  Then "_@Name@_" should not be visible in the first table line
  When Click on sort icon in "Created" table cell
  Then "_@Name@_" should be visible in the first table line
  When Click on sort icon in "Created" table cell
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify the sort function in "Tech" list ##
DL_95 Verify the sort function when click on sort icon in "Name" column
  [Tags]                                                                                                Sort                       Tech                   DataName                    Name
  Create a test data type in "Tech" list with "A" in data name
  Create a test data type in "Tech" list with "Z" in data name
  When Click on sort icon in "Name" table cell
  Then "A" should be visible in the first table line
  Then "Z" should not be visible in the first table line
  When Click on sort icon in "Name" table cell
  Then "A" should not be visible in the first table line
  Then "Z" should be visible in the first table line
  When Click on sort icon in "Name" table cell
  When Click on the "Xóa" button in the "Z" table line
  When Click on the "Xóa" button in the "A" table line

DL_96 Verify the sort function when click on sort icon in "Order" column
  [Tags]                                                                                                Sort                       Tech                    Order
  ${Data1}=                                                                                             Create a test data type in "Tech" list with "1" in order
  Create a test data type in "Tech" list with "999999999" in order
  When Click on sort icon in "Order" table cell
  Then "${Data1}" should be visible in the first table line
  Then "_@Name@_" should not be visible in the first table line
  When Click on sort icon in "Order" table cell
  Then "${Data1}" should not be visible in the first table line
  Then "_@Name@_" should be visible in the first table line
  When Click on sort icon in "Order" table cell
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_97 Verify the sort function when click on sort icon in "Order" column
  [Tags]                                                                                                Sort                       Tech                    Order
  Create a test data type in "Tech" list
  When Click on sort icon in "Created" table cell
  Then "_@Name@_" should not be visible in the first table line
  When Click on sort icon in "Created" table cell
  Then "_@Name@_" should be visible in the first table line
  When Click on sort icon in "Created" table cell
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify the sort function in "Member" list ##
DL_98 Verify the sort function when click on sort icon in "Name" column
  [Tags]                                                                                                Sort                       Member                   DataName
  Create a test data type in "Member" list with "A" in data name
  Create a test data type in "Member" list with "Z" in data name
  When Click on sort icon in "Name" table cell
  Then "A" should be visible in the first table line
  Then "Z" should not be visible in the first table line
  When Click on sort icon in "Name" table cell
  Then "A" should not be visible in the first table line
  Then "Z" should be visible in the first table line
  When Click on sort icon in "Name" table cell
  When Click on the "Xóa" button in the "Z" table line
  When Click on the "Xóa" button in the "A" table line

DL_99 Verify the sort function when click on sort icon in "Order" column
  [Tags]                                                                                                Sort                       Member                    Order
  ${Data1}=                                                                                             Create a test data type in "Member" list with "1" in order
  Create a test data type in "Member" list with "999999999" in order
  When Click on sort icon in "Order" table cell
  Then "${Data1}" should be visible in the first table line
  Then "_@Name@_" should not be visible in the first table line
  When Click on sort icon in "Order" table cell
  Then "${Data1}" should not be visible in the first table line
  Then "_@Name@_" should be visible in the first table line
  When Click on sort icon in "Order" table cell
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_100 Verify the sort function when click on sort icon in "Order" column
  [Tags]                                                                                                Sort                       Member                    Order
  Create a test data type in "Member" list
  When Click on sort icon in "Created" table cell
  Then "_@Name@_" should not be visible in the first table line
  When Click on sort icon in "Created" table cell
  Then "_@Name@_" should be visible in the first table line
  When Click on sort icon in "Created" table cell
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify the sort function in "Value" list ##
DL_101 Verify the sort function when click on sort icon in "Name" column
  [Tags]                                                                                                Sort                       Value                     DataName
  Create a test data type in "Value" list with "A" in data name
  Create a test data type in "Value" list with "Z" in data name
  When Click on sort icon in "Name" table cell
  Then "A" should be visible in the first table line
  Then "Z" should not be visible in the first table line
  When Click on sort icon in "Name" table cell
  Then "A" should not be visible in the first table line
  Then "Z" should be visible in the first table line
  When Click on sort icon in "Name" table cell
  When Click on the "Xóa" button in the "Z" table line
  When Click on the "Xóa" button in the "A" table line

DL_102 Verify the sort function when click on sort icon in "Order" column
  [Tags]                                                                                                Sort                       Value                    Order
  ${Data1}=                                                                                             Create a test data type in "Value" list with "1" in order
  Create a test data type in "Value" list with "999999999" in order
  When Click on sort icon in "Order" table cell
  Then "${Data1}" should be visible in the first table line
  Then "_@Name@_" should not be visible in the first table line
  When Click on sort icon in "Order" table cell
  Then "${Data1}" should not be visible in the first table line
  Then "_@Name@_" should be visible in the first table line
  When Click on sort icon in "Order" table cell
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_103 Verify the sort function when click on sort icon in "Order" column
  [Tags]                                                                                                Sort                       Value                     Order
  Create a test data type in "Value" list
  When Click on sort icon in "Created" table cell
  Then "_@Name@_" should not be visible in the first table line
  When Click on sort icon in "Created" table cell
  Then "_@Name@_" should be visible in the first table line
  When Click on sort icon in "Created" table cell
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify the sort function in "Services" list ##
DL_104 Verify the sort function when click on sort icon in "Name" column
  [Tags]                                                                                                Sort                       Services                  DataName
  Create a test data type in "Services" list with "A" in data name
  Create a test data type in "Services" list with "Z" in data name
  When Click on sort icon in "Name" table cell
  Then "A" should be visible in the first table line
  Then "Z" should not be visible in the first table line
  When Click on sort icon in "Name" table cell
  Then "A" should not be visible in the first table line
  Then "Z" should be visible in the first table line
  When Click on sort icon in "Name" table cell
  When Click on the "Xóa" button in the "Z" table line
  When Click on the "Xóa" button in the "A" table line

DL_105 Verify the sort function when click on sort icon in "Order" column
  [Tags]                                                                                                Sort                       Services                  Order
  ${Data1}=                                                                                             Create a test data type in "Services" list with "1" in order
  Create a test data type in "Services" list with "999999999" in order
  When Click on sort icon in "Order" table cell
  Then "${Data1}" should be visible in the first table line
  Then "_@Name@_" should not be visible in the first table line
  When Click on sort icon in "Order" table cell
  Then "${Data1}" should not be visible in the first table line
  Then "_@Name@_" should be visible in the first table line
  When Click on sort icon in "Order" table cell
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_106 Verify the sort function when click on sort icon in "Order" column
  [Tags]                                                                                                Sort                       Services                  Order
  Create a test data type in "Services" list
  When Click on sort icon in "Created" table cell
  Then "_@Name@_" should not be visible in the first table line
  When Click on sort icon in "Created" table cell
  Then "_@Name@_" should be visible in the first table line
  When Click on sort icon in "Created" table cell
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify the sort function in "Mission" list ##
DL_107 Verify the sort function when click on sort icon in "Name" column
  [Tags]                                                                                                Sort                       Mission                  DataName
  Create a test data type in "Mission" list with "A" in data name
  Create a test data type in "Mission" list with "Z" in data name
  When Click on sort icon in "Name" table cell
  Then "A" should be visible in the first table line
  Then "Z" should not be visible in the first table line
  When Click on sort icon in "Name" table cell
  Then "A" should not be visible in the first table line
  Then "Z" should be visible in the first table line
  When Click on sort icon in "Name" table cell
  When Click on the "Xóa" button in the "Z" table line
  When Click on the "Xóa" button in the "A" table line

DL_108 Verify the sort function when click on sort icon in "Order" column
  [Tags]                                                                                                Sort                       Mission                  Order
  ${Data1}=                                                                                             Create a test data type in "Mission" list with "1" in order
  Create a test data type in "Mission" list with "999999999" in order
  When Click on sort icon in "Order" table cell
  Then "${Data1}" should be visible in the first table line
  Then "_@Name@_" should not be visible in the first table line
  When Click on sort icon in "Order" table cell
  Then "${Data1}" should not be visible in the first table line
  Then "_@Name@_" should be visible in the first table line
  When Click on sort icon in "Order" table cell
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data1}" table line

DL_109 Verify the sort function when click on sort icon in "Order" column
  [Tags]                                                                                                Sort                       Mission                  Order
  Create a test data type in "Mission" list
  When Click on sort icon in "Created" table cell
  Then "_@Name@_" should not be visible in the first table line
  When Click on sort icon in "Created" table cell
  Then "_@Name@_" should be visible in the first table line
  When Click on sort icon in "Created" table cell
  When Click on the "Xóa" button in the "_@Name@_" table line

### Verify that edit the data type's information ###
## Verify that edit data type's information page of "Partner" list ##
DL_110 Verify the UI of the editing data type page in "Partner" list
  [Tags]                                                                                                EditInfo                   Partner                  UI
  Create a test data type in "Partner" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Heading should contain "Chỉnh sửa dữ liệu Partner" inner text
  Then Webpage should contain "Name" input field
  Then Webpage should contain "Order" input field
  Then Webpage should contain "Ảnh" image upload field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_111 Verity that change the data type's information by entering the valid data in "Name" filed
  [Tags]                                                                                                EditInfo                   Partner                  Valid
  Create a test data type in "Partner" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_112 Verity that change the data type's information by entering the valid data in "Order" filed
  [Tags]                                                                                                EditInfo                   Partner                  Valid
  Create a test data type in "Partner" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "number" in "Order" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Data's information in "Order" should be equal "_@Order@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_112_02 Verity that change the data type's information by entering the valid data in "Order" filed (The number have more than 10 characters)
#   [Tags]                                                                                                EditInfo                   Partner                  Valid
#   Create a test data type in "Partner" list
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   When Enter "number" in "Order" with "1231231231"
#   When Click "Lưu lại" button
#   Then User look message "Cập nhật thành công" popup
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   Then Data's information in "Order" should be equal "1231231231"
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_113 Verity that change the data type's information by entering the valid data in "Ảnh" filed
  [Tags]                                                                                                EditInfo                   Partner                  Valid
  Create a test data type in "Partner" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${before}=                     Get the image's information in "Ảnh" field
  When Click on cross icon inside image in "Ảnh"
  When Select file in "Ảnh" with "image2.jpg"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${after}=                      Get the image's information in "Ảnh" field
  Then Should Not Be Equal       ${after}    ${before}
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_114 Verify the "Huỷ bỏ" button in the edit data type's information page
  [Tags]                                                                                                EditInfo                   Partner                  Button
  ${Data}=                       Create a test data type in "Partner" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Huỷ bỏ" button
  Then "_@Name@_" should not be visible in the table line
  When Click on the "Sửa" button in the "${Data}" table line

DL_115 Verify the "Lưu lại" button in the edit data type's information page
  [Tags]                                                                                                EditInfo                   Partner                  Button
  Create a test data type in "Partner" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Name@_" should not be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_116 Verify the "Lưu và tạo mới" button in the edit data type's information page
#   [Tags]

DL_117 Verity that change the data type's information by entering the invalid data in "Order" filed
  [Tags]                                                                                                EditInfo                   Partner                  Invalid
  Create a test data type in "Partner" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "text" in "Order" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chỉ nhập số" displayed under "Order" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_118 Verity that CAN NOT change the data type's information by entering the existent order in "Order" field
  [Tags]                                                                                                EditInfo                   Partner                  Invalid
  ${Data}=                               Create a test data type in "Partner" list
  Create a test data type in "Partner" list
  When Click on the "Sửa" button in the "${Data}" table line
  When Enter "text" in "Order" with "_@Order@_"
  When Click "Lưu lại" button
  Then User look message "Order bị trùng lặp" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data}" table line

DL_119 Verity that CAN NOT change the data type's information by entering existent name in "Name" field
  [Tags]                                                                                                EditInfo                   Partner                  Invalid
  ${Data}=                               Create a test data type in "Partner" list
  Create a test data type in "Partner" list
  When Click on the "Sửa" button in the "${Data}" table line
  When Enter "test name" in "Name" with "_@Name@_"
  When Click "Lưu lại" button
  Then User look message "Name đã được sử dung" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data}" table line

DL_120 Verity that CAN NOT change the data type's information by leaving a blank field in "Name"
  [Tags]                                                                                                EditInfo                   Partner                  BlankField
  ${Data}=                       Create a test data type in "Partner" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập Name" displayed under "Name" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Data}" table line

DL_121 Verity that CAN NOT change the data type's information by leaving a blank field in "Order"
  [Tags]                                                                                                EditInfo                   Partner                  BlankField
  Create a test data type in "Partner" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "number" in "Order" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập số order" displayed under "Order" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_122 Verity that CAN change the data type's information by leaving a blank field in "Ảnh"
  [Tags]                                                                                                EditInfo                   Partner                  BlankField
  Create a test data type in "Partner" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on cross icon inside image in "Ảnh"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify that edit data type's information page of "Tech" list ##
DL_123 Verify the UI of the editing data type page in "Tech" list
  [Tags]                                                                                                EditInfo                   Tech                  UI
  Create a test data type in "Tech" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Heading should contain "Chỉnh sửa dữ liệu Tech" inner text
  Then Webpage should contain "Name" input field
  Then Webpage should contain "Order" input field
  Then Webpage should contain "Ảnh" image upload field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_124 Verity that change the data type's information by entering the valid data in "Name" filed
  [Tags]                                                                                                EditInfo                   Tech                  Valid
  Create a test data type in "Tech" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_125 Verity that change the data type's information by entering the valid data in "Order" filed
  [Tags]                                                                                                EditInfo                   Tech                  Valid
  Create a test data type in "Tech" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "number" in "Order" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Data's information in "Order" should be equal "_@Order@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_125_02 Verity that change the data type's information by entering the valid data in "Order" filed (The number have more than 10 characters)
#   [Tags]                                                                                                EditInfo                   Tech                  Valid
#   Create a test data type in "Tech" list
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   When Enter "number" in "Order" with "1231231231"
#   When Click "Lưu lại" button
#   Then User look message "Cập nhật thành công" popup
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   Then Data's information in "Order" should be equal "1231231231"
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_126 Verity that change the data type's information by entering the valid data in "Ảnh" filed
  [Tags]                                                                                                EditInfo                   Tech                  Valid
  Create a test data type in "Tech" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${before}=                     Get the image's information in "Ảnh" field
  When Click on cross icon inside image in "Ảnh"
  When Select file in "Ảnh" with "image2.jpg"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${after}=                      Get the image's information in "Ảnh" field
  Then Should Not Be Equal       ${after}    ${before}
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_127 Verify the "Huỷ bỏ" button in the edit data type's information page
  [Tags]                                                                                                EditInfo                   Tech                  Button
  ${Data}=                       Create a test data type in "Tech" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Huỷ bỏ" button
  Then "_@Name@_" should not be visible in the table line
  When Click on the "Sửa" button in the "${Data}" table line

DL_128 Verify the "Lưu lại" button in the edit data type's information page
  [Tags]                                                                                                EditInfo                   Tech                  Button
  Create a test data type in "Tech" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Name@_" should not be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_129 Verify the "Lưu và tạo mới" button in the edit data type's information page
#   [Tags]

DL_130 Verity that change the data type's information by entering the invalid data in "Order" filed
  [Tags]                                                                                                EditInfo                   Tech                  Invalid
  Create a test data type in "Tech" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "text" in "Order" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chỉ nhập số" displayed under "Order" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_131 Verity that CAN NOT change the data type's information by entering the existent order in "Order" field
  [Tags]                                                                                                EditInfo                   Tech                  Invalid
  ${Data}=                               Create a test data type in "Tech" list
  Create a test data type in "Tech" list
  When Click on the "Sửa" button in the "${Data}" table line
  When Enter "text" in "Order" with "_@Order@_"
  When Click "Lưu lại" button
  Then User look message "Order bị trùng lặp" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data}" table line

DL_132 Verity that CAN NOT change the data type's information by entering existent name in "Name" field
  [Tags]                                                                                                EditInfo                   Tech                  Invalid
  ${Data}=                               Create a test data type in "Tech" list
  Create a test data type in "Tech" list
  When Click on the "Sửa" button in the "${Data}" table line
  When Enter "test name" in "Name" with "_@Name@_"
  When Click "Lưu lại" button
  Then User look message "Name đã được sử dung" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data}" table line

DL_133 Verity that CAN NOT change the data type's information by leaving a blank field in "Name"
  [Tags]                                                                                                EditInfo                   Tech                  BlankField
  ${Data}=                       Create a test data type in "Tech" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập Name" displayed under "Name" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Data}" table line

DL_134 Verity that CAN NOT change the data type's information by leaving a blank field in "Order"
  [Tags]                                                                                                EditInfo                   Tech                  BlankField
  Create a test data type in "Tech" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "number" in "Order" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập số order" displayed under "Order" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_135 Verity that CAN change the data type's information by leaving a blank field in "Ảnh"
  [Tags]                                                                                                EditInfo                   Tech                  BlankField
  Create a test data type in "Tech" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on cross icon inside image in "Ảnh"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify that edit data type's information page of "Member" list ##
DL_136 Verify the UI of the editing data type page in "Member" list in ENGLISH Tab
  [Tags]                                                                                                EditInfo                   Member                  UI
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Heading should contain "Chỉnh sửa dữ liệu Member" inner text
  Then Webpage should contain "Order" input field
  Then Webpage should contain "Ảnh" image upload field
  Then Webpage should contain "Name" input field
  Then Webpage should contain "Position" input field
  Then Webpage should contain "Desciption" input field
  Then Webpage should contain "Content" input field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_137 Verify the UI of the editing data type page in "Member" list in VIETNAMESE Tab
#   [Tags]                                                                                                EditInfo                   Member                  UI
#   Create a test data type in "Member" list
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   Then Heading should contain "Chỉnh sửa dữ liệu Member" inner text
#   Then Webpage should contain "Order" input field
#   Then Webpage should contain "Ảnh" image upload field
#   Then Webpage should contain "Name" input field
#   Then Webpage should contain "Position" input field
#   Then Webpage should contain "Desciption" input field
#   Then Webpage should contain "Content" input field
#   Then Webpage should contain "Lưu lại" button
#   Then Webpage should contain "Lưu và tạo mới" button
#   Then Webpage should contain "Huỷ bỏ" button
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_138 Verity that change the data type's information by entering the valid data in "Order" filed
  [Tags]                                                                                                EditInfo                   Member                  Valid
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "number" in "Order" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Data's information in "Order" should be equal "_@Order@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_138_02 Verity that change the data type's information by entering the valid data in "Order" filed (The number have more than 10 characters)
#   [Tags]                                                                                                EditInfo                   Member                  Valid
#   Create a test data type in "Member" list
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   When Enter "number" in "Order" with "1231231231"
#   When Click "Lưu lại" button
#   Then User look message "Cập nhật thành công" popup
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   Then Data's information in "Order" should be equal "_@Order@_"
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_139 Verity that change the data type's information by entering the valid data in "Ảnh" filed
  [Tags]                                                                                                EditInfo                   Member                  Valid
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${before}=                     Get the image's information in "Ảnh" field
  When Click on cross icon inside image in "Ảnh"
  When Select file in "Ảnh" with "image2.jpg"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${after}=                      Get the image's information in "Ảnh" field
  Then Should Not Be Equal       ${after}    ${before}
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_140 Verity that change the data type's information by entering the valid data in "Name" filed (VIETNAM tab)
  [Tags]                                                                                                EditInfo                   Member                  Valid
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_140_02 Verity that change the data type's information by entering the valid data in "Name" filed (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Member                  Valid
  ${Data}=                          Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "${Data}" table line
  When Click on "ENGLISH" tab
  Then Data's information in "Name" should be equal "_@Name@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Data}" table line

DL_141 Verity that change the data type's information by entering the valid data in "Vị trí" filed (VIETNAM tab)
  [Tags]                                                                                                EditInfo                   Member                  Valid
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in "Position" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  Then Data's information in "Position" should be equal "_@Position@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_141_02 Verity that change the data type's information by entering the valid data in "Position" filed (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Member                  Valid
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in "Position" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  Then Data's information in "Position" should be equal "_@Position@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_142 Verity that change the data type's information by entering the valid data in "Mô tả" filed (VIETNAM tab)
  [Tags]                                                                                                EditInfo                   Member                  Valid
  Create a test data type in "Member" list
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

DL_142_02 Verity that change the data type's information by entering the valid data in "Description" filed (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Member                  Valid
  Create a test data type in "Member" list
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

DL_143 Verity that change the data type's information by entering the valid data in "Nội dung" filed (VIETNAM tab)
  [Tags]                                                                                                EditInfo                   Member                  Valid
  Create a test data type in "Member" list
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

DL_143_02 Verity that change the data type's information by entering the valid data in "Content" filed (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Member                  Valid
  Create a test data type in "Member" list
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

DL_144 Verify the "Huỷ bỏ" button in the edit data type's information page
  [Tags]                                                                                                EditInfo                   Member                  Button
  Create a test data type in "Member" list
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

DL_145 Verify the "Huỷ bỏ" button in the edit data type's information page
  [Tags]                                                                                                EditInfo                   Member                    Button
  ${Data}=                       Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Huỷ bỏ" button
  Then "_@Name@_" should not be visible in the table line
  When Click on the "Sửa" button in the "${Data}" table line

# DL_146 Verify the "Lưu lại và tạo mới" button in the edit data type's information page
#   [Tags]                                                                                                EditInfo                   Member                    Button

DL_147 Verity that change the data type's information by entering the invalid data in "Order" filed
  [Tags]                                                                                                EditInfo                   Member                    Invalid
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "text" in "Order" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chỉ nhập số" displayed under "Order" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_148 Verity that CAN NOT change the data type's information by entering the existent order in "Order" field
  [Tags]                                                                                                EditInfo                   Member                    Invalid
  ${Data}=                   Create a test data type in "Member" list
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "${Data}" table line
  When Enter "text" in "Order" with "_@Order@_"
  When Click "Lưu lại" button
  Then User look message "Order bị trùng lặp" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data}" table line

DL_149 Verity that CAN NOT change the data type's information by entering existent name in "Name" field
  [Tags]                                                                                                EditInfo                   Member                    Invalid
  ${Data}=                   Create a test data type in "Member" list
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "${Data}" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_@Name@_"
  When Click "Lưu lại" button
  Then User look message "Name đã được sử dung" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data}" table line

DL_150 Verity that change the data type's information by leaving a blank field in "Order"
  [Tags]                                                                                                EditInfo                   Member                    BlankField
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "number" in "Order" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập số order" displayed under "Order" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_151 Verity that change the data type's information by leaving a blank field in "Ảnh"
  [Tags]                                                                                                EditInfo                   Member                    BlankField
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on cross icon inside image in "Ảnh"
  When Click "Lưu lại" button
  Then User look message "Vui lòng chọn ít nhất một ảnh" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_152 Verity that change the data type's information by leaving a blank field in "Name" (VIETNAME tab)
  [Tags]                                                                                                EditInfo                   Member                    BlankField
  ${Data}=                       Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Data}" table line

DL_152_02 Verity that change the data type's information by leaving a blank field in "Name" (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Member                    BlankField
  ${Data}=                       Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Data}" table line

DL_153 Verity that CAN change the data type's information by leaving a blank field in "Vị trí" (VIETNAME tab)
  [Tags]                                                                                                EditInfo                   Member                    BlankField
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in" in "Position" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_153_02 Verity that change the data type's information by leaving a blank field in "Position" (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Member                    BlankField
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in" in "Position" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_154 Verity that change the data type's information by leaving a blank field in "Mô tả" (VIETNAM tab)
  [Tags]                                                                                                EditInfo                   Member                    BlankField
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in" in "Description" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_154_02 Verity that change the data type's information by leaving a blank field in "Description" (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Member                    BlankField
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in" in "Description" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_155 Verity that change the data type's information by leaving a blank field in "Nội dung" (VIETNAM tab)
  [Tags]                                                                                                EditInfo                   Member                    BlankField
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in" in "Content" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_155_02 Verity that change the data type's information by leaving a blank field in "Content" (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Member                    BlankField
  Create a test data type in "Member" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in" in "Content" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify that edit data type's information page of "Value" list ##
DL_156 Verify the UI of the editing data type page in "Value" list in ENGLISH Tab
  [Tags]                                                                                                EditInfo                   Value                  UI
  Create a test data type in "Value" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Heading should contain "Chỉnh sửa dữ liệu Value" inner text
  Then Webpage should contain "Order" input field
  Then Webpage should contain "Ảnh" image upload field
  Then Webpage should contain "Name" input field
  Then Webpage should contain "Desciption" input field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_157 Verify the UI of the editing data type page in "Value" list in VIETNAMESE Tab
#   [Tags]                                                                                                EditInfo                   Value                  UI
#   Create a test data type in "Value" list
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   When Click on "VIETNAM" tab
#   Then Heading should contain "Chỉnh sửa dữ liệu Value" inner text
#   Then Webpage should contain "Order" input field
#   Then Webpage should contain "Ảnh" image upload field
#   Then Webpage should contain "Tên dữ liệu" input field
#   Then Webpage should contain "Mô tả" input field
#   Then Webpage should contain "Lưu lại" button
#   Then Webpage should contain "Lưu và tạo mới" button
#   Then Webpage should contain "Huỷ bỏ" button
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_158 Verity that change the data type's information by entering the valid data in "Order" filed
  [Tags]                                                                                                EditInfo                   Value                  Valid
  Create a test data type in "Value" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "number" in "Order" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Data's information in "Order" should be equal "_@Order@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_158_02 Verity that change the data type's information by entering the valid data in "Order" filed (The number have more than 10 characters)
#   [Tags]                                                                                                EditInfo                   Value                  Valid
#   Create a test data type in "Value" list
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   When Enter "number" in "Order" with "1231231231"
#   When Click "Lưu lại" button
#   Then User look message "Cập nhật thành công" popup
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   Then Data's information in "Order" should be equal "_@Order@_"
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_159 Verity that change the data type's information by entering the valid data in "Ảnh" filed
  [Tags]                                                                                                EditInfo                   Value                  Valid
  Create a test data type in "Value" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${before}=                     Get the image's information in "Ảnh" field
  When Click on cross icon inside image in "Ảnh"
  When Select file in "Ảnh" with "image2.jpg"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${after}=                      Get the image's information in "Ảnh" field
  Then Should Not Be Equal       ${after}    ${before}
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_160 Verity that change the data type's information by entering the valid data in "Name" filed (VIETNAM tab)
  [Tags]                                                                                                EditInfo                   Value                  Valid
  Create a test data type in "Value" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_160_02 Verity that change the data type's information by entering the valid data in "Name" filed (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Value                  Valid
  ${Data}=                        Create a test data type in "Value" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "${Data}" table line
  When Click on "ENGLISH" tab
  Then Data's information in "Name" should be equal "_@Name@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Data}" table line

DL_161 Verity that change the data type's information by entering the valid data in "Mô tả" filed (VIETNAM tab)
  [Tags]                                                                                                EditInfo                   Value                  Valid
  Create a test data type in "Value" list
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

DL_161_02 Verity that change the data type's information by entering the valid data in "Description" filed (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Value                  Valid
  Create a test data type in "Value" list
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

DL_162 Verify the "Huỷ bỏ" button in the edit data type's information page
  [Tags]                                                                                                EditInfo                   Value                    Button
  ${Data}=                       Create a test data type in "Value" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Huỷ bỏ" button
  Then "_@Name@_" should not be visible in the table line
  When Click on the "Sửa" button in the "${Data}" table line

DL_163 Verify the "Lưu lại" button in the edit data type's information page
  [Tags]                                                                                                EditInfo                   Value                    Button
  Create a test data type in "Value" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Name@_" should not be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_164 Verify the "Lưu và tạo mới" button in the edit data type's information page
  # [Tags]                                                                                                EditInfo                   Value                    Button

DL_165 Verity that change the data type's information by entering the invalid data in "Order" filed
  [Tags]                                                                                                EditInfo                   Value                    Invalid
  Create a test data type in "Value" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "text" in "Order" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chỉ nhập số" displayed under "Order" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_166 Verity that CAN NOT change the data type's information by entering the existent order in "Order" field
  [Tags]                                                                                                EditInfo                   Value                    Invalid
  ${Data}=                       Create a test data type in "Value" list
  Create a test data type in "Value" list
  When Click on the "Sửa" button in the "${Data}" table line
  When Enter "text" in "Order" with "_@Order@_"
  When Click "Lưu lại" button
  Then User look message "Order bị trùng lặp" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data}" table line

DL_167 Verity that CAN NOT change the data type's information by entering existent name in "Name" field
  [Tags]                                                                                                EditInfo                   Value                    Invalid
  ${Data}=                       Create a test data type in "Value" list
  Create a test data type in "Value" list
  When Click on the "Sửa" button in the "${Data}" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_@Name@_"
  When Click "Lưu lại" button
  Then User look message "Name đã được sử dung" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data}" table line

DL_168 Verity that change the data type's information by leaving a blank field in "Order"
  [Tags]                                                                                                EditInfo                   Value                    BlankField
  Create a test data type in "Value" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "number" in "Order" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập số order" displayed under "Order" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_169 Verity that change the data type's information by leaving a blank field in "Ảnh"
  [Tags]                                                                                                EditInfo                   Value                    BlankField
  Create a test data type in "Value" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on cross icon inside image in "Ảnh"
  When Click "Lưu lại" button
  Then User look message "Vui lòng chọn ít nhất một ảnh" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_170 Verity that change the data type's information by leaving a blank field in "Name" (VIETNAME tab)
  [Tags]                                                                                                EditInfo                   Value                    BlankField
  ${Data}=                       Create a test data type in "Value" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Data}" table line

DL_170_02 Verity that change the data type's information by leaving a blank field in "Name" (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Value                    BlankField
  ${Data}=                       Create a test data type in "Value" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Data}" table line

DL_171 Verity that change the data type's information by leaving a blank field in "Mô tả" (VIETNAM tab)
  [Tags]                                                                                                EditInfo                   Value                    BlankField
  Create a test data type in "Value" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in" in "Description" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_171_02 Verity that change the data type's information by leaving a blank field in "Description" (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Value                    BlankField
  Create a test data type in "Value" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in" in "Description" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify that edit data type's information page of "Services" list ##
DL_172 Verify the UI of the editing data type page in "Services" list in ENGLISH Tab
  [Tags]                                                                                                EditInfo                   Services                  UI
  Create a test data type in "Services" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Heading should contain "Chỉnh sửa dữ liệu Services" inner text
  Then Webpage should contain "Order" input field
  Then Webpage should contain "Ảnh" image upload field
  Then Webpage should contain "Name" input field
  Then Webpage should contain "Desciption" input field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_173 Verify the UI of the editing data type page in "Services" list in VIETNAMESE Tab
#   [Tags]                                                                                                EditInfo                   Services                  UI
#   Create a test data type in "Services" list
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   When Click on "VIETNAM" tab
#   Then Heading should contain "Chỉnh sửa dữ liệu Services" inner text
#   Then Webpage should contain "Order" input field
#   Then Webpage should contain "Ảnh" image upload field
#   Then Webpage should contain "Tên dữ liệu" input field
#   Then Webpage should contain "Mô tả" input field
#   Then Webpage should contain "Lưu lại" button
#   Then Webpage should contain "Lưu và tạo mới" button
#   Then Webpage should contain "Huỷ bỏ" button
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_174 Verity that change the data type's information by entering the valid data in "Order" filed
  [Tags]                                                                                                EditInfo                   Services                  Valid
  Create a test data type in "Services" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "number" in "Order" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Data's information in "Order" should be equal "_@Order@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_174_02 Verity that change the data type's information by entering the valid data in "Order" filed (The number have more than 10 characters)
#   [Tags]                                                                                                EditInfo                   Services                  Valid
#   Create a test data type in "Services" list
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   When Enter "number" in "Order" with "1231231231"
#   When Click "Lưu lại" button
#   Then User look message "Cập nhật thành công" popup
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   Then Data's information in "Order" should be equal "_@Order@_"
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_175 Verity that change the data type's information by entering the valid data in "Ảnh" filed
  [Tags]                                                                                                EditInfo                   Services                  Valid
  Create a test data type in "Services" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${before}=                     Get the image's information in "Ảnh" field
  When Click on cross icon inside image in "Ảnh"
  When Select file in "Ảnh" with "image2.jpg"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${after}=                      Get the image's information in "Ảnh" field
  Then Should Not Be Equal       ${after}    ${before}
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_176 Verity that change the data type's information by entering the valid data in "Name" filed (VIETNAM tab)
  [Tags]                                                                                                EditInfo                   Services                  Valid
  Create a test data type in "Services" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_176_02 Verity that change the data type's information by entering the valid data in "Name" filed (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Services                  Valid
  ${Data}=                        Create a test data type in "Services" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "${Data}" table line
  When Click on "ENGLISH" tab
  Then Data's information in "Name" should be equal "_@Name@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Data}" table line

DL_177 Verity that change the data type's information by entering the valid data in "Mô tả" filed (VIETNAM tab)
  [Tags]                                                                                                EditInfo                   Services                  Valid
  Create a test data type in "Services" list
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

DL_177_02 Verity that change the data type's information by entering the valid data in "Description" filed (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Services                  Valid
  Create a test data type in "Services" list
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

DL_178 Verify the "Huỷ bỏ" button in the edit data type's information page
  [Tags]                                                                                                EditInfo                   Services                    Button
  ${Data}=                       Create a test data type in "Services" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Huỷ bỏ" button
  Then "_@Name@_" should not be visible in the table line
  When Click on the "Sửa" button in the "${Data}" table line

DL_179 Verify the "Lưu lại" button in the edit data type's information page
  [Tags]                                                                                                EditInfo                   Services                    Button
  Create a test data type in "Services" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Name@_" should not be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_180 Verify the "Lưu và tạo mới" button in the edit data type's information page
  # [Tags]                                                                                                EditInfo                   Services                    Button

DL_181 Verity that change the data type's information by entering the invalid data in "Order" filed
  [Tags]                                                                                                EditInfo                   Services                    Invalid
  Create a test data type in "Services" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "text" in "Order" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chỉ nhập số" displayed under "Order" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_182 Verity that CAN NOT change the data type's information by entering the existent order in "Order" field
  [Tags]                                                                                                EditInfo                   Services                    Invalid
  ${Data}=                       Create a test data type in "Services" list
  Create a test data type in "Services" list
  When Click on the "Sửa" button in the "${Data}" table line
  When Enter "text" in "Order" with "_@Order@_"
  When Click "Lưu lại" button
  Then User look message "Order bị trùng lặp" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data}" table line

DL_183 Verity that CAN NOT change the data type's information by entering existent name in "Name" field
  [Tags]                                                                                                EditInfo                   Services                    Invalid
  ${Data}=                       Create a test data type in "Services" list
  Create a test data type in "Services" list
  When Click on the "Sửa" button in the "${Data}" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_@Name@_"
  When Click "Lưu lại" button
  Then User look message "Name đã được sử dung" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data}" table line

DL_184 Verity that change the data type's information by leaving a blank field in "Order"
  [Tags]                                                                                                EditInfo                   Services                    BlankField
  Create a test data type in "Services" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "number" in "Order" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập số order" displayed under "Order" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_185 Verity that change the data type's information by leaving a blank field in "Ảnh"
  [Tags]                                                                                                EditInfo                   Services                    BlankField
  Create a test data type in "Services" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on cross icon inside image in "Ảnh"
  When Click "Lưu lại" button
  Then User look message "Vui lòng chọn ít nhất một ảnh" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_186 Verity that change the data type's information by leaving a blank field in "Name" (VIETNAME tab)
  [Tags]                                                                                                EditInfo                   Services                    BlankField
  ${Data}=                       Create a test data type in "Services" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Data}" table line

DL_186_02 Verity that change the data type's information by leaving a blank field in "Name" (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Services                    BlankField
  ${Data}=                       Create a test data type in "Services" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Data}" table line

DL_187 Verity that change the data type's information by leaving a blank field in "Mô tả" (VIETNAM tab)
  [Tags]                                                                                                EditInfo                   Services                    BlankField
  Create a test data type in "Services" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in" in "Description" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_187_02 Verity that change the data type's information by leaving a blank field in "Description" (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Services                    BlankField
  Create a test data type in "Services" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in" in "Description" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify that edit data type's information page of "Mission" list ##
DL_188 Verify the UI of the editing data type page in "Mission" list in ENGLISH Tab
  [Tags]                                                                                                EditInfo                   Mission                  UI
  Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Heading should contain "Chỉnh sửa dữ liệu Mission" inner text
  Then Webpage should contain "Order" input field
  Then Webpage should contain "Ảnh" image upload field
  Then Webpage should contain "Name" input field
  Then Webpage should contain "Desciption" input field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_189 Verify the UI of the editing data type page in "Mission" list in VIETNAMESE Tab
#   [Tags]                                                                                                EditInfo                   Mission                  UI
#   Create a test data type in "Mission" list
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   When Click on "VIETNAM" tab
#   Then Heading should contain "Chỉnh sửa dữ liệu Mission" inner text
#   Then Webpage should contain "Order" input field
#   Then Webpage should contain "Ảnh" image upload field
#   Then Webpage should contain "Tên dữ liệu" input field
#   Then Webpage should contain "Mô tả" input field
#   Then Webpage should contain "Lưu lại" button
#   Then Webpage should contain "Lưu và tạo mới" button
#   Then Webpage should contain "Huỷ bỏ" button
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_190 Verity that change the data type's information by entering the valid data in "Order" filed
  [Tags]                                                                                                EditInfo                   Mission                  Valid
  Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "number" in "Order" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  Then Data's information in "Order" should be equal "_@Order@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_190_02 Verity that change the data type's information by entering the valid data in "Order" filed (The number have more than 10 characters)
#   [Tags]                                                                                                EditInfo                   Mission                  Valid
#   Create a test data type in "Mission" list
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   When Enter "number" in "Order" with "1231231231"
#   When Click "Lưu lại" button
#   Then User look message "Cập nhật thành công" popup
#   When Click on the "Sửa" button in the "_@Name@_" table line
#   Then Data's information in "Order" should be equal "_@Order@_"
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_191 Verity that change the data type's information by entering the valid data in "Ảnh" filed
  [Tags]                                                                                                EditInfo                   Mission                  Valid
  Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${before}=                     Get the image's information in "Ảnh" field
  When Click on cross icon inside image in "Ảnh"
  When Select file in "Ảnh" with "image2.jpg"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Name@_" table line
  ${after}=                      Get the image's information in "Ảnh" field
  Then Should Not Be Equal       ${after}    ${before}
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_192 Verity that change the data type's information by entering the valid data in "Name" filed (VIETNAM tab)
  [Tags]                                                                                                EditInfo                   Mission                  Valid
  Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_192_02 Verity that change the data type's information by entering the valid data in "Name" filed (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Mission                  Valid
  ${Data}=                        Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "${Data}" table line
  When Click on "ENGLISH" tab
  Then Data's information in "Name" should be equal "_@Name@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Data}" table line

DL_193 Verity that change the data type's information by entering the valid data in "Mô tả" filed (VIETNAM tab)
  [Tags]                                                                                                EditInfo                   Mission                  Valid
  Create a test data type in "Mission" list
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

DL_193_02 Verity that change the data type's information by entering the valid data in "Description" filed (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Mission                  Valid
  Create a test data type in "Mission" list
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

DL_194 Verify the "Huỷ bỏ" button in the edit data type's information page
  [Tags]                                                                                                EditInfo                   Mission                    Button
  ${Data}=                       Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Huỷ bỏ" button
  Then "_@Name@_" should not be visible in the table line
  When Click on the "Sửa" button in the "${Data}" table line

DL_195 Verify the "Lưu lại" button in the edit data type's information page
  [Tags]                                                                                                EditInfo                   Mission                    Button
  Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Name@_" should not be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

# DL_196 Verify the "Lưu và tạo mới" button in the edit data type's information page
  # [Tags]                                                                                                EditInfo                   Mission                    Button

DL_197 Verity that change the data type's information by entering the invalid data in "Order" filed
  [Tags]                                                                                                EditInfo                   Mission                    Invalid
  Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "text" in "Order" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chỉ nhập số" displayed under "Order" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_198 Verity that CAN NOT change the data type's information by entering the existent order in "Order" field
  [Tags]                                                                                                EditInfo                   Mission                    Invalid
  ${Data}=                       Create a test data type in "Mission" list
  Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "${Data}" table line
  When Enter "text" in "Order" with "_@Order@_"
  When Click "Lưu lại" button
  Then User look message "Order bị trùng lặp" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data}" table line

DL_199 Verity that CAN NOT change the data type's information by entering existent name in "Name" field
  [Tags]                                                                                                EditInfo                   Mission                    Invalid
  ${Data}=                       Create a test data type in "Mission" list
  Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "${Data}" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_@Name@_"
  When Click "Lưu lại" button
  Then User look message "Name đã được sử dung" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line
  When Click on the "Xóa" button in the "${Data}" table line

DL_200 Verity that change the data type's information by leaving a blank field in "Order"
  [Tags]                                                                                                EditInfo                   Mission                    BlankField
  Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Enter "number" in "Order" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập số order" displayed under "Order" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_201 Verity that change the data type's information by leaving a blank field in "Ảnh"
  [Tags]                                                                                                EditInfo                   Mission                    BlankField
  Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on cross icon inside image in "Ảnh"
  When Click "Lưu lại" button
  Then User look message "Vui lòng chọn ít nhất một ảnh" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_202 Verity that change the data type's information by leaving a blank field in "Name" (VIETNAME tab)
  [Tags]                                                                                                EditInfo                   Mission                    BlankField
  ${Data}=                       Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Data}" table line

DL_202_02 Verity that change the data type's information by leaving a blank field in "Name" (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Mission                    BlankField
  ${Data}=                       Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Data}" table line

DL_203 Verity that change the data type's information by leaving a blank field in "Mô tả" (VIETNAM tab)
  [Tags]                                                                                                EditInfo                   Mission                    BlankField
  Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "VIETNAM" tab
  When Enter "text" in" in "Description" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_203_02 Verity that change the data type's information by leaving a blank field in "Description" (ENGLISH tab)
  [Tags]                                                                                                EditInfo                   Mission                    BlankField
  Create a test data type in "Mission" list
  When Click on the "Sửa" button in the "_@Name@_" table line
  When Click on "ENGLISH" tab
  When Enter "text" in" in "Description" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

### Verify that create a new data type ###
## Verify that create new data type in "Partner" list ##
DL_204 Verify the UI of the creating new data type page in "Partner" list
  [Tags]                                                                                                Create                     Partner                     UI
  Go to "Danh sách Dữ liệu" page with "Partner" list
  When Click "Tạo mới" button
  Then Heading should contain "Tạo mới dữ liệu Partner" inner text
  Then Webpage should contain "Name" input field
  Then Webpage should contain "Order" input field
  Then Webpage should contain "Ảnh" image upload field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button

DL_205 Verify that create a new data type in "Partner" list by entering valid data
  [Tags]                                                                                                Create                     Partner                     Valid
  Go to "Danh sách Dữ liệu" page with "Partner" list
  When Click "Tạo mới" button
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_206 Verify that create a new data type in "Partner" list by entering valid data in "Order"
  [Tags]                                                                                                Create                     Partner                     Invalid
  Go to "Danh sách Dữ liệu" page with "Partner" list
  When Click "Tạo mới" button
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chỉ nhập số" displayed under "Order" field

# DL_207 Verify that CAN NOT create a new data type in "Partner" list by entering an existent number in "Order"
#   [Tags]                                                                                                Create                     Partner                     Invalid
#   ${Data}=                          Create a test data type in "Partner" list
#   When Click "Tạo mới" button
#   When Enter "test name" in "Name" with "_RANDOM_"
#   When Enter "text" in "Order" with "_@Order@_"
#   When Select file in "Ảnh" with "image.jpg"
#   When Click "Lưu lại" button
#   Then User look message "Mã order đã được sử dụng" popup
#   When Click "Huỷ bỏ" button
#   Then Click on the "Xóa" button in the "${Data}" table line

# DL_208 Verify that CAN NOT create a new data type in "Partner" list by entering an existent name in "Name"
#   [Tags]                                                                                                Create                     Partner                     Invalid
#   Create a test data type in "Partner" list
#   When Click "Tạo mới" button
#   When Enter "test name" in "Name" with "_@Name@_"
#   When Enter "text" in "Order" with "_RANDOM_"
#   When Select file in "Ảnh" with "image.jpg"
#   When Click "Lưu lại" button
#   When Click "Huỷ bỏ" button
#   Then User look message "Tên dữ liệu trùng lặp" popup
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_209 Verify that create a new data type in "Partner" list by leaving blank field in "Name"
  [Tags]                                                                                                Create                     Partner                     BlankField
  Go to "Danh sách Dữ liệu" page with "Partner" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field

DL_210 Verify that create a new data type in "Partner" list by leaving blank field in "Order"
  [Tags]                                                                                                Create                     Partner                     BlankField
  Go to "Danh sách Dữ liệu" page with "Partner" list
  When Click "Tạo mới" button
  When Enter "test name" in "Name" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập order" displayed under "Order" field

DL_211 Verify that CAN create a new data type in "Partner" list by leaving blank field in "Ảnh"
  [Tags]                                                                                                Create                     Partner                     BlankField
  Go to "Danh sách Dữ liệu" page with "Partner" list
  When Click "Tạo mới" button
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Order" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify that create new data type in "Tech" list ##
DL_212 Verify the UI of the creating new data type page in "Tech" list
  [Tags]                                                                                                Create                     Tech                     UI
  Go to "Danh sách Dữ liệu" page with "Tech" list
  When Click "Tạo mới" button
  Then Heading should contain "Tạo mới dữ liệu Tech" inner text
  Then Webpage should contain "Name" input field
  Then Webpage should contain "Order" input field
  Then Webpage should contain "Ảnh" image upload field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button

DL_213 Verify that create a new data type in "Tech" list by entering valid data
  [Tags]                                                                                                Create                     Tech                     Valid
  Go to "Danh sách Dữ liệu" page with "Tech" list
  When Click "Tạo mới" button
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_214 Verify that create a new data type in "Tech" list by entering valid data in "Order"
  [Tags]                                                                                                Create                     Tech                     Invalid
  Go to "Danh sách Dữ liệu" page with "Tech" list
  When Click "Tạo mới" button
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chỉ nhập số" displayed under "Order" field

# DL_215 Verify that CAN NOT create a new data type in "Partner" list by entering an existent number in "Order"
#   [Tags]                                                                                                Create                     Tech                     Invalid
#   ${Data}=                          Create a test data type in "Tech" list
#   When Click "Tạo mới" button
#   When Enter "test name" in "Name" with "_RANDOM_"
#   When Enter "text" in "Order" with "_@Order@_"
#   When Select file in "Ảnh" with "image.jpg"
#   When Click "Lưu lại" button
#   Then User look message "Mã order đã được sử dụng" popup
#   When Click "Huỷ bỏ" button
#   Then Click on the "Xóa" button in the "${Data}" table line

# DL_216 Verify that CAN NOT create a new data type in "Tech" list by entering an existent name in "Name"
#   [Tags]                                                                                                Create                     Tech                     Invalid
#   Create a test data type in "Tech" list
#   When Click "Tạo mới" button
#   When Enter "test name" in "Name" with "_@Name@_"
#   When Enter "text" in "Order" with "_RANDOM_"
#   When Select file in "Ảnh" with "image.jpg"
#   When Click "Lưu lại" button
#   When Click "Huỷ bỏ" button
#   Then User look message "Tên dữ liệu trùng lặp" popup
#   When Click on the "Xóa" button in the "_@Name@_" table line

DL_217 Verify that create a new data type in "Tech" list by leaving blank field in "Name"
  [Tags]                                                                                                Create                     Tech                     BlankField
  Go to "Danh sách Dữ liệu" page with "Tech" list
  When Click "Tạo mới" button
  When Enter "text" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field

DL_218 Verify that create a new data type in "Tech" list by leaving blank field in "Order"
  [Tags]                                                                                                Create                     Tech                     BlankField
  Go to "Danh sách Dữ liệu" page with "Tech" list
  When Click "Tạo mới" button
  When Enter "test name" in "Name" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập order" displayed under "Order" field

DL_219 Verify that CAN create a new data type in "Tech" list by leaving blank field in "Ảnh"
  [Tags]                                                                                                Create                     Tech                     BlankField
  Go to "Danh sách Dữ liệu" page with "Tech" list
  When Click "Tạo mới" button
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Order" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify that create new data type in "Member" list ##
DL_220 Verify the UI of the creating new data type page in "Member" list (ENGLISH ver.)
  [Tags]                                                                                                Create                     Member                     UI
  Go to "Danh sách Dữ liệu" page with "Member" list
  When Click "Tạo mới" button
  Then Heading should contain "Tạo mới dữ liệu Member" inner text
  Then Webpage should contain "Order" input field
  Then Webpage should contain "Ảnh" image upload field
  Then Webpage should contain "ENGLISH" tab
  Then Webpage should contain "Name" input field
  Then Webpage should contain "Position" input field
  Then Webpage should contain "Desciption" input field
  Then Webpage should contain "Content" input field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button

# DL_221 Verify the User Interface of the creating new data type page in "Member" list (VIETNAMSE ver.)
#   [Tags]                                                                                                Create                     Member                     UI
#   Go to "Danh sách Dữ liệu" page with "Member" list
#   When Click "Tạo mới" button
#   Then Heading should contain "Tạo mới dữ liệu Member" inner text
#   Then Webpage should contain "Order" input field
#   Then Webpage should contain "Ảnh" image upload field
#   Then Webpage should contain "ENGLISH" tab
#   Then Webpage should contain "Name" input field
#   Then Webpage should contain "Vị trí" input field
#   Then Webpage should contain "Mô tả" input field
#   Then Webpage should contain "Nội dung" input field
#   Then Webpage should contain "Lưu lại" button
#   Then Webpage should contain "Lưu và tạo mới" button
#   Then Webpage should contain "Huỷ bỏ" button

DL_222 Verify that create a new data type in "Member" list by entering valid data
  [Tags]                                                                                                Create                     Member                     Valid
  Go to "Danh sách Dữ liệu" page with "Member" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_223 Verify that CAN NOT create a new data type in "Member" list by entering valid data in "Order"
  [Tags]                                                                                                Create                     Member                     Invalid
  Go to "Danh sách Dữ liệu" page with "Member" list
  When Click "Tạo mới" button
  When Enter "text" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chỉ nhập số" displayed under "Order" field

# DL_224 Verify that CAN NOT create a new data type in "Member" list by entering an existent number in "Order"
#   [Tags]                                                                                                Create                     Member                     Invalid
#   ${Data}                    Create a test data type in "Member" list
#   When Click "Tạo mới" button
#   When Enter "number" in "Order" with "_@Order@_"
#   When Select file in "Ảnh" with "image.jpg"
#   When Click on "ENGLISH" tab
#   When Enter "test name" in "Name" with "_RANDOM_"
#   When Enter "text" in "Position" with "_RANDOM_"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Enter "text" in editor "Content" with "_RANDOM_"
#   When Click on "VIETNAM" tab
#   When Enter "test name" in "Name" with "_RANDOM_"
#   When Enter "text" in "Position" with "_RANDOM_"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Enter "text" in editor "Content" with "_RANDOM_"
#   When Click "Lưu lại" button
#   Then User look message "Order bị trùng lặp" popup
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "${Data}" table line

# DL_225 Verify that CAN NOT create a new data type in "Member" list by entering an existent name in "Name"
#   [Tags]                                                                                                Create                     Member                     Invalid
#   ${Data}                    Create a test data type in "Member" list
#   When Click "Tạo mới" button
#   When Enter "number" in "Order" with "_RANDOM_"
#   When Select file in "Ảnh" with "image.jpg"
#   When Click on "ENGLISH" tab
#   When Enter "test name" in "Name" with "_RANDOM_"
#   When Enter "text" in "Position" with "_RANDOM_"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Enter "text" in editor "Content" with "_RANDOM_"
#   When Click on "VIETNAM" tab
#   When Enter "test name" in "Name" with "${Data}"
#   When Enter "text" in "Position" with "_RANDOM_"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Enter "text" in editor "Content" with "_RANDOM_"
#   When Click "Lưu lại" button
#   Then User look message "Name đã được sử dụng" popup
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "${Data}" table line

DL_226 Verify that create a new data type in "Member" list by leaving blank field in "Order"
  [Tags]                                                                                                Create                     Member                     BlankField
  Go to "Danh sách Dữ liệu" page with "Member" list
  When Click "Tạo mới" button
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập order" displayed under "Order" field

DL_227 Verify that create a new data type in "Member" list by leaving blank field in "Ảnh"
  [Tags]                                                                                                Create                     Member                     BlankField
  Go to "Danh sách Dữ liệu" page with "Member" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_228 Verify that CAN NOT create a new data type in "Member" list by leaving blank field in "Name" (ENGLISH tab)
  [Tags]                                                                                                Create                     Member                     BlankField
  Go to "Danh sách Dữ liệu" page with "Member" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "ENGLISH" tab
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field

DL_229 Verify that CAN NOT create a new data type in "Member" list by leaving blank field in "Name" (VIETNAM tab)
  [Tags]                                                                                                Create                     Member                     BlankField
  Go to "Danh sách Dữ liệu" page with "Member" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field

DL_230 Verify that CAN create a new data type in "Member" list by leaving blank field in "Position" (ENGLISH tab)
  [Tags]                                                                                                Create                     Member                     BlankField
  Go to "Danh sách Dữ liệu" page with "Member" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_231 Verify that CAN create a new data type in "Member" list by leaving blank field in "Vị trí" (VIETNAM tab)
  [Tags]                                                                                                Create                     Member                     BlankField
  Go to "Danh sách Dữ liệu" page with "Member" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_232 Verify that CAN create a new data type in "Member" list by leaving blank field in "Description" (ENGLISH tab)
  [Tags]                                                                                                Create                     Member                     BlankField
  Go to "Danh sách Dữ liệu" page with "Member" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_233 Verify that CAN create a new data type in "Member" list by leaving blank field in "Mô tả" (VIETNAM tab)
  [Tags]                                                                                                Create                     Member                     BlankField
  Go to "Danh sách Dữ liệu" page with "Member" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_234 Verify that CAN create a new data type in "Member" list by leaving blank field in "Content" (ENGLISH tab)
  [Tags]                                                                                                Create                     Member                     BlankField
  Go to "Danh sách Dữ liệu" page with "Member" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_235 Verify that CAN create a new data type in "Member" list by leaving blank field in "Nội dung" (VIETNAM tab)
  [Tags]                                                                                                Create                     Member                     BlankField
  Go to "Danh sách Dữ liệu" page with "Member" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Enter "text" in editor "Content" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in "Position" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify that create new data type in "Value" list ##
DL_236 Verify the UI of the creating new data type page in "Value" list (ENGLISH ver.)
  [Tags]                                                                                                Create                     Value                     UI
  Go to "Danh sách Dữ liệu" page with "Value" list
  When Click "Tạo mới" button
  Then Heading should contain "Tạo mới dữ liệu Value" inner text
  Then Webpage should contain "Order" input field
  Then Webpage should contain "Ảnh" image upload field
  Then Webpage should contain "ENGLISH" tab
  Then Webpage should contain "Name" input field
  Then Webpage should contain "Desciption" input field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button

# DL_237 Verify the User Interface of the creating new data type page in "Value" list (VIETNAMSE ver.)
#   [Tags]                                                                                                Create                     Value                     UI
#   Go to "Danh sách Dữ liệu" page with "Value" list
#   When Click "Tạo mới" button
#   Then Heading should contain "Tạo mới dữ liệu Value" inner text
#   Then Webpage should contain "Order" input field
#   Then Webpage should contain "Ảnh" image upload field
#   Then Webpage should contain "ENGLISH" tab
#   Then Webpage should contain "Name" input field
#   Then Webpage should contain "Mô tả" input field
#   Then Webpage should contain "Lưu lại" button
#   Then Webpage should contain "Lưu và tạo mới" button
#   Then Webpage should contain "Huỷ bỏ" button

DL_238 Verify that create a new data type in "Value" list by entering valid data
  [Tags]                                                                                                Create                     Value                     Valid
  Go to "Danh sách Dữ liệu" page with "Value" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_239 Verify that CAN NOT create a new data type in "Value" list by entering valid data in "Order"
  [Tags]                                                                                                Create                     Value                     Invalid
  Go to "Danh sách Dữ liệu" page with "Value" list
  When Click "Tạo mới" button
  When Enter "text" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chỉ nhập số" displayed under "Order" field

# DL_240 Verify that CAN NOT create a new data type in "Value" list by entering an existent number in "Order"
#   [Tags]                                                                                                Create                     Value                     Invalid
#   ${Data}                    Create a test data type in "Value" list
#   When Click "Tạo mới" button
#   When Enter "number" in "Order" with "_@Order@_"
#   When Select file in "Ảnh" with "image.jpg"
#   When Click on "ENGLISH" tab
#   When Enter "test name" in "Name" with "_RANDOM_"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Click on "VIETNAM" tab
#   When Enter "test name" in "Name" with "_RANDOM_"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Click "Lưu lại" button
#   Then User look message "Order bị trùng lặp" popup
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "${Data}" table line

# DL_241 Verify that CAN NOT create a new data type in "Value" list by entering an existent name in "Name"
#   [Tags]                                                                                                Create                     Value                     Invalid
#   ${Data}                    Create a test data type in "Value" list
#   When Click "Tạo mới" button
#   When Enter "number" in "Order" with "_RANDOM_"
#   When Select file in "Ảnh" with "image.jpg"
#   When Click on "ENGLISH" tab
#   When Enter "test name" in "Name" with "_RANDOM_"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Click on "VIETNAM" tab
#   When Enter "test name" in "Name" with "${Data}"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Click "Lưu lại" button
#   Then User look message "Name đã được sử dụng" popup
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "${Data}" table line

DL_242 Verify that create a new data type in "Value" list by leaving blank field in "Order"
  [Tags]                                                                                                Create                     Value                     BlankField
  Go to "Danh sách Dữ liệu" page with "Value" list
  When Click "Tạo mới" button
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập order" displayed under "Order" field

DL_243 Verify that create a new data type in "Value" list by leaving blank field in "Ảnh"
  [Tags]                                                                                                Create                     Value                     BlankField
  Go to "Danh sách Dữ liệu" page with "Value" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_244 Verify that CAN NOT create a new data type in "Value" list by leaving blank field in "Name" (ENGLISH tab)
  [Tags]                                                                                                Create                     Value                     BlankField
  Go to "Danh sách Dữ liệu" page with "Value" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "ENGLISH" tab
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field

DL_245 Verify that CAN NOT create a new data type in "Value" list by leaving blank field in "Name" (VIETNAM tab)
  [Tags]                                                                                                Create                     Value                     BlankField
  Go to "Danh sách Dữ liệu" page with "Value" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field

DL_246 Verify that CAN create a new data type in "Value" list by leaving blank field in "Description" (ENGLISH tab)
  [Tags]                                                                                                Create                     Value                     BlankField
  Go to "Danh sách Dữ liệu" page with "Value" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_247 Verify that CAN create a new data type in "Value" list by leaving blank field in "Mô tả" (VIETNAM tab)
  [Tags]                                                                                                Create                     Value                     BlankField
  Go to "Danh sách Dữ liệu" page with "Value" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify that create new data type in "Services" list ##
DL_248 Verify the UI of the creating new data type page in "Services" list (ENGLISH ver.)
  [Tags]                                                                                                Create                     Services                     UI
  Go to "Danh sách Dữ liệu" page with "Services" list
  When Click "Tạo mới" button
  Then Heading should contain "Tạo mới dữ liệu Services" inner text
  Then Webpage should contain "Order" input field
  Then Webpage should contain "Ảnh" image upload field
  Then Webpage should contain "ENGLISH" tab
  Then Webpage should contain "Name" input field
  Then Webpage should contain "Desciption" input field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button

# DL_249 Verify the User Interface of the creating new data type page in "Services" list (VIETNAMSE ver.)
#   [Tags]                                                                                                Create                     Services                     UI
#   Go to "Danh sách Dữ liệu" page with "Services" list
#   When Click "Tạo mới" button
#   Then Heading should contain "Tạo mới dữ liệu Services" inner text
#   Then Webpage should contain "Order" input field
#   Then Webpage should contain "Ảnh" image upload field
#   Then Webpage should contain "ENGLISH" tab
#   Then Webpage should contain "Name" input field
#   Then Webpage should contain "Mô tả" input field
#   Then Webpage should contain "Lưu lại" button
#   Then Webpage should contain "Lưu và tạo mới" button
#   Then Webpage should contain "Huỷ bỏ" button

DL_250 Verify that create a new data type in "Services" list by entering valid data
  [Tags]                                                                                                Create                     Services                     Valid
  Go to "Danh sách Dữ liệu" page with "Services" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_251 Verify that CAN NOT create a new data type in "Services" list by entering valid data in "Order"
  [Tags]                                                                                                Create                     Services                     Invalid
  Go to "Danh sách Dữ liệu" page with "Services" list
  When Click "Tạo mới" button
  When Enter "text" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chỉ nhập số" displayed under "Order" field

# DL_252 Verify that CAN NOT create a new data type in "Services" list by entering an existent number in "Order"
#   [Tags]                                                                                                Create                     Services                     Invalid
#   ${Data}                    Create a test data type in "Services" list
#   When Click "Tạo mới" button
#   When Enter "number" in "Order" with "_@Order@_"
#   When Select file in "Ảnh" with "image.jpg"
#   When Click on "ENGLISH" tab
#   When Enter "test name" in "Name" with "_RANDOM_"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Click on "VIETNAM" tab
#   When Enter "test name" in "Name" with "_RANDOM_"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Click "Lưu lại" button
#   Then User look message "Order bị trùng lặp" popup
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "${Data}" table line

# DL_253 Verify that CAN NOT create a new data type in "Services" list by entering an existent name in "Name"
#   [Tags]                                                                                                Create                     Services                     Invalid
#   ${Data}                    Create a test data type in "Services" list
#   When Click "Tạo mới" button
#   When Enter "number" in "Order" with "_RANDOM_"
#   When Select file in "Ảnh" with "image.jpg"
#   When Click on "ENGLISH" tab
#   When Enter "test name" in "Name" with "_RANDOM_"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Click on "VIETNAM" tab
#   When Enter "test name" in "Name" with "${Data}"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Click "Lưu lại" button
#   Then User look message "Name đã được sử dụng" popup
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "${Data}" table line

DL_254 Verify that create a new data type in "Services" list by leaving blank field in "Order"
  [Tags]                                                                                                Create                     Services                     BlankField
  Go to "Danh sách Dữ liệu" page with "Services" list
  When Click "Tạo mới" button
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập order" displayed under "Order" field

DL_255 Verify that create a new data type in "Services" list by leaving blank field in "Ảnh"
  [Tags]                                                                                                Create                     Services                     BlankField
  Go to "Danh sách Dữ liệu" page with "Services" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_256 Verify that CAN NOT create a new data type in "Services" list by leaving blank field in "Name" (ENGLISH tab)
  [Tags]                                                                                                Create                     Services                     BlankField
  Go to "Danh sách Dữ liệu" page with "Services" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "ENGLISH" tab
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field

DL_257 Verify that CAN NOT create a new data type in "Services" list by leaving blank field in "Name" (VIETNAM tab)
  [Tags]                                                                                                Create                     Services                     BlankField
  Go to "Danh sách Dữ liệu" page with "Services" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field

DL_258 Verify that CAN create a new data type in "Services" list by leaving blank field in "Description" (ENGLISH tab)
  [Tags]                                                                                                Create                     Services                     BlankField
  Go to "Danh sách Dữ liệu" page with "Services" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_259 Verify that CAN create a new data type in "Services" list by leaving blank field in "Mô tả" (VIETNAM tab)
  [Tags]                                                                                                Create                     Services                     BlankField
  Go to "Danh sách Dữ liệu" page with "Services" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify that create new data type in "Mission" list ##
DL_260 Verify the UI of the creating new data type page in "Mission" list (ENGLISH ver.)
  [Tags]                                                                                                Create                     Mission                     UI
  Go to "Danh sách Dữ liệu" page with "Mission" list
  When Click "Tạo mới" button
  Then Heading should contain "Tạo mới dữ liệu Mission" inner text
  Then Webpage should contain "Order" input field
  Then Webpage should contain "Ảnh" image upload field
  Then Webpage should contain "ENGLISH" tab
  Then Webpage should contain "Name" input field
  Then Webpage should contain "Desciption" input field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Lưu và tạo mới" button
  Then Webpage should contain "Huỷ bỏ" button

# DL_261 Verify the User Interface of the creating new data type page in "Mission" list (VIETNAMSE ver.)
#   [Tags]                                                                                                Create                     Mission                     UI
#   Go to "Danh sách Dữ liệu" page with "Mission" list
#   When Click "Tạo mới" button
#   Then Heading should contain "Tạo mới dữ liệu Mission" inner text
#   Then Webpage should contain "Order" input field
#   Then Webpage should contain "Ảnh" image upload field
#   Then Webpage should contain "ENGLISH" tab
#   Then Webpage should contain "Name" input field
#   Then Webpage should contain "Mô tả" input field
#   Then Webpage should contain "Lưu lại" button
#   Then Webpage should contain "Lưu và tạo mới" button
#   Then Webpage should contain "Huỷ bỏ" button

DL_262 Verify that create a new data type in "Mission" list by entering valid data
  [Tags]                                                                                                Create                     Mission                     Valid
  Go to "Danh sách Dữ liệu" page with "Mission" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_263 Verify that CAN NOT create a new data type in "Mission" list by entering valid data in "Order"
  [Tags]                                                                                                Create                     Mission                     Invalid
  Go to "Danh sách Dữ liệu" page with "Mission" list
  When Click "Tạo mới" button
  When Enter "text" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chỉ nhập số" displayed under "Order" field

# DL_264 Verify that CAN NOT create a new data type in "Mission" list by entering an existent number in "Order"
#   [Tags]                                                                                                Create                     Mission                     Invalid
#   ${Data}                    Create a test data type in "Mission" list
#   When Click "Tạo mới" button
#   When Enter "number" in "Order" with "_@Order@_"
#   When Select file in "Ảnh" with "image.jpg"
#   When Click on "ENGLISH" tab
#   When Enter "test name" in "Name" with "_RANDOM_"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Click on "VIETNAM" tab
#   When Enter "test name" in "Name" with "_RANDOM_"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Click "Lưu lại" button
#   Then User look message "Order bị trùng lặp" popup
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "${Data}" table line

# DL_265 Verify that CAN NOT create a new data type in "Mission" list by entering an existent name in "Name"
#   [Tags]                                                                                                Create                     Mission                     Invalid
#   ${Data}                    Create a test data type in "Mission" list
#   When Click "Tạo mới" button
#   When Enter "number" in "Order" with "_RANDOM_"
#   When Select file in "Ảnh" with "image.jpg"
#   When Click on "ENGLISH" tab
#   When Enter "test name" in "Name" with "_RANDOM_"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Click on "VIETNAM" tab
#   When Enter "test name" in "Name" with "${Data}"
#   When Enter "text" in textarea "Description" with "_RANDOM_"
#   When Click "Lưu lại" button
#   Then User look message "Name đã được sử dụng" popup
#   When Click "Huỷ bỏ" button
#   When Click on the "Xóa" button in the "${Data}" table line

DL_266 Verify that create a new data type in "Mission" list by leaving blank field in "Order"
  [Tags]                                                                                                Create                     Mission                     BlankField
  Go to "Danh sách Dữ liệu" page with "Mission" list
  When Click "Tạo mới" button
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập order" displayed under "Order" field

DL_267 Verify that create a new data type in "Mission" list by leaving blank field in "Ảnh"
  [Tags]                                                                                                Create                     Mission                     BlankField
  Go to "Danh sách Dữ liệu" page with "Mission" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_268 Verify that CAN NOT create a new data type in "Mission" list by leaving blank field in "Name" (ENGLISH tab)
  [Tags]                                                                                                Create                     Mission                     BlankField
  Go to "Danh sách Dữ liệu" page with "Mission" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "ENGLISH" tab
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field

DL_269 Verify that CAN NOT create a new data type in "Mission" list by leaving blank field in "Name" (VIETNAM tab)
  [Tags]                                                                                                Create                     Mission                     BlankField
  Go to "Danh sách Dữ liệu" page with "Mission" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập name" displayed under "Name" field

DL_270 Verify that CAN create a new data type in "Mission" list by leaving blank field in "Description" (ENGLISH tab)
  [Tags]                                                                                                Create                     Mission                     BlankField
  Go to "Danh sách Dữ liệu" page with "Mission" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

DL_271 Verify that CAN create a new data type in "Mission" list by leaving blank field in "Mô tả" (VIETNAM tab)
  [Tags]                                                                                                Create                     Mission                     BlankField
  Go to "Danh sách Dữ liệu" page with "Mission" list
  When Click "Tạo mới" button
  When Enter "number" in "Order" with "_RANDOM_"
  When Select file in "Ảnh" with "image.jpg"
  When Click on "ENGLISH" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Enter "text" in textarea "Description" with "_RANDOM_"
  When Click on "VIETNAM" tab
  When Enter "test name" in "Name" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Name@_" table line

### Verify that delete data type ###
## Verify the delete function in "Partner" list ##
DL_272 Verify the delete data type function
  [Tags]                                                                                                Delete                     Partner
  Create a test data type in "Partner" list
  When Click on the "Xóa" button in the "_@Name@_" table line
  Then User look message "Xóa thành công" popup
  Then "_@Name@_" should not be visible in the table line

DL_273 Verify the cancel action button when delete data type
  [Tags]                                                                                                Delete                     Partner
  Create a test data type in "Partner" list
  When Click on the "Xóa" button in the "_@Name@_" table line with cancel
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify the delete function in "Tech" list ##
DL_274 Verify the delete data type function
  [Tags]                                                                                                Delete                     Tech
  Create a test data type in "Tech" list
  When Click on the "Xóa" button in the "_@Name@_" table line
  Then User look message "Xóa thành công" popup
  Then "_@Name@_" should not be visible in the table line

DL_275 Verify the cancel action button when delete data type
  [Tags]                                                                                                Delete                     Tech
  Create a test data type in "Tech" list
  When Click on the "Xóa" button in the "_@Name@_" table line with cancel
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify the delete function in "Member" list ##
DL_276 Verify the delete data type function
  [Tags]                                                                                                Delete                     Member
  Create a test data type in "Member" list
  When Click on the "Xóa" button in the "_@Name@_" table line
  Then User look message "Xóa thành công" popup
  Then "_@Name@_" should not be visible in the table line

DL_277 Verify the cancel action button when delete data type
  [Tags]                                                                                                Delete                     Member
  Create a test data type in "Member" list
  When Click on the "Xóa" button in the "_@Name@_" table line with cancel
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify the delete function in "Value" list ##
DL_278 Verify the delete data type function
  [Tags]                                                                                                Delete                     Value
  Create a test data type in "Value" list
  When Click on the "Xóa" button in the "_@Name@_" table line
  Then User look message "Xóa thành công" popup
  Then "_@Name@_" should not be visible in the table line

DL_279 Verify the cancel action button when delete data type
  [Tags]                                                                                                Delete                     Value
  Create a test data type in "Value" list
  When Click on the "Xóa" button in the "_@Name@_" table line with cancel
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify the delete function in "Services" list ##
DL_280 Verify the delete data type function
  [Tags]                                                                                                Delete                     Services
  Create a test data type in "Services" list
  When Click on the "Xóa" button in the "_@Name@_" table line
  Then User look message "Xóa thành công" popup
  Then "_@Name@_" should not be visible in the table line

DL_281 Verify the cancel action button when delete data type
  [Tags]                                                                                                Delete                     Services
  Create a test data type in "Services" list
  When Click on the "Xóa" button in the "_@Name@_" table line with cancel
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

## Verify the delete function in "Mission" list ##
DL_282 Verify the delete data type function
  [Tags]                                                                                                Delete                     Mission
  Create a test data type in "Mission" list
  When Click on the "Xóa" button in the "_@Name@_" table line
  Then User look message "Xóa thành công" popup
  Then "_@Name@_" should not be visible in the table line

DL_283 Verify the cancel action button when delete data type
  [Tags]                                                                                                Delete                     Mission
  Create a test data type in "Mission" list
  When Click on the "Xóa" button in the "_@Name@_" table line with cancel
  Then "_@Name@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Name@_" table line

*** Keywords ***
Go to "Danh sách Dữ liệu" page with "${category}" list
  Login to admin
  Click "Thiết lập" menu
  Click "Dữ liệu" sub menu to "/#/vn/setting/data"
  Select on the "${category}" item line

### Partner ###
Create a test data type in "Partner" list
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Partner" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Partner" list
    Click "Tạo mới" button
  END
  Enter "test name" in "Name" with "_RANDOM_"
    ${name}=               Check Text                               _@Name@_
  Enter "number" in "Order" with "_RANDOM_"
  Select file in "Ảnh" with "image.jpg"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test data type in "Partner" list with "${name}" in data name
  ${name}=                 Get Random Text                          test name                 ${name}
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Partner" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Partner" list
    Click "Tạo mới" button
  END
  Enter "test name" in "Name" with "${name}"
  Enter "number" in "Order" with "_RANDOM_"
  Select file in "Ảnh" with "image.jpg"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test data type in "Partner" list with "${order}" in order
  ${name}=                 Get Random Text                          number                    ${order}
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Partner" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Partner" list
    Click "Tạo mới" button
  END
  Enter "test name" in "Name" with "_RANDOM_"
    ${name}=               Check Text                               _@Name@_
  Enter "number" in "Order" with "${order}"
  Select file in "Ảnh" with "image.jpg"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

### Tech ###
Create a test data type in "Tech" list
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Tech" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Tech" list
    Click "Tạo mới" button
  END
  Enter "test name" in "Name" with "_RANDOM_"
    ${name}=               Check Text                               _@Name@_
  Enter "number" in "Order" with "_RANDOM_"
  Select file in "Ảnh" with "image.jpg"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test data type in "Tech" list with "${name}" in data name
  ${name}=                 Get Random Text                          test name                 ${name}
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Tech" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Tech" list
    Click "Tạo mới" button
  END
  Enter "test name" in "Name" with "${name}"
  Enter "number" in "Order" with "_RANDOM_"
  Select file in "Ảnh" with "image.jpg"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test data type in "Tech" list with "${order}" in order
  ${name}=                 Get Random Text                          number                    ${order}
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Tech" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Tech" list
    Click "Tạo mới" button
  END
  Enter "test name" in "Name" with "_RANDOM_"
    ${name}=               Check Text                               _@Name@_
  Enter "number" in "Order" with "${order}"
  Select file in "Ảnh" with "image.jpg"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

### Member ###
Create a test data type in "Member" list
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Member" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Member" list
    Click "Tạo mới" button
  END
  Enter "number" in "Order" with "_RANDOM_"
  Select file in "Ảnh" with "image.jpg"
  Click on "ENGLISH" tab
  Enter "test name" in "Name" with "_RANDOM_"
  Enter "word" in "Position" with "_RANDOM_"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Enter "paragraph" in editor "Content" with "_RANDOM_"
  Click on "VIETNAM" tab
  Enter "test name" in "Name" with "_RANDOM_"
    ${name}=               Check Text                               _@Name@_
  Enter "word" in "Position" with "_RANDOM_"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Enter "paragraph" in editor "Content" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test data type in "Member" list with "${name}" in data name
  ${name}=                 Get Random Text                          test name                 ${name}
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Member" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Member" list
    Click "Tạo mới" button
  END
  Enter "number" in "Order" with "_RANDOM_"
  Select file in "Ảnh" with "image.jpg"
  Click on "ENGLISH" tab
  Enter "test name" in "Name" with "_RANDOM_"
  Enter "word" in "Position" with "_RANDOM_"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Enter "paragraph" in "Content" with "_RANDOM_"
  Click on "VIETNAM" tab
  Enter "test name" in "Name" with "${name}"
  Enter "word" in "Position" with "_RANDOM_"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Enter "paragraph" in "Content" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test data type in "Member" list with "${order}" in order
  ${name}=                 Get Random Text                          number                    ${order}
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Member" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Member" list
    Click "Tạo mới" button
  END
  Enter "number" in "Order" with "${order}"
  Select file in "Ảnh" with "image.jpg"
  Click on "ENGLISH" tab
  Enter "test name" in "Name" with "_RANDOM_"
  Enter "word" in "Position" with "_RANDOM_"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Enter "paragraph" in "Content" with "_RANDOM_"
  Click on "VIETNAM" tab
  Enter "test name" in "Name" with "_RANDOM_"
    ${name}=               Check Text                               _@Name@_
  Enter "word" in "Position" with "_RANDOM_"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Enter "paragraph" in "Content" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

### Value ###
Create a test data type in "Value" list
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Value" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Value" list
    Click "Tạo mới" button
  END
  Enter "number" in "Order" with "_RANDOM_"
  Select file in "Ảnh" with "image.jpg"
  Click on "ENGLISH" tab
  Enter "test name" in "Name" with "_RANDOM_"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click on "VIETNAM" tab
  Enter "test name" in "Name" with "_RANDOM_"
    ${name}=               Check Text                               _@Name@_
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test data type in "Value" list with "${name}" in data name
  ${name}=                 Get Random Text                          test name                 ${name}
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Value" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Value" list
    Click "Tạo mới" button
  END
  Enter "number" in "Order" with "_RANDOM_"
  Select file in "Ảnh" with "image.jpg"
  Click on "ENGLISH" tab
  Enter "test name" in "Name" with "_RANDOM_"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click on "VIETNAM" tab
  Enter "test name" in "Name" with "${name}"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test data type in "Value" list with "${order}" in order
  ${name}=                 Get Random Text                          number                    ${order}
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Value" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Value" list
    Click "Tạo mới" button
  END
  Enter "number" in "Order" with "${order}"
  Select file in "Ảnh" with "image.jpg"
  Click on "ENGLISH" tab
  Enter "test name" in "Name" with "_RANDOM_"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click on "VIETNAM" tab
  Enter "test name" in "Name" with "_RANDOM_"
    ${name}=               Check Text                               _@Name@_
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

### Services ###
Create a test data type in "Services" list
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Services" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Services" list
    Click "Tạo mới" button
  END
  Enter "number" in "Order" with "_RANDOM_"
  Select file in "Ảnh" with "image.jpg"
  Click on "ENGLISH" tab
  Enter "test name" in "Name" with "_RANDOM_"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click on "VIETNAM" tab
  Enter "test name" in "Name" with "_RANDOM_"
    ${name}=               Check Text                               _@Name@_
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test data type in "Services" list with "${name}" in data name
  ${name}=                 Get Random Text                          test name                 ${name}
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Services" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Services" list
    Click "Tạo mới" button
  END
  Enter "number" in "Order" with "_RANDOM_"
  Select file in "Ảnh" with "image.jpg"
  Click on "ENGLISH" tab
  Enter "test name" in "Name" with "_RANDOM_"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click on "VIETNAM" tab
  Enter "test name" in "Name" with "${name}"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test data type in "Services" list with "${order}" in order
  ${name}=                 Get Random Text                          number                    ${order}
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Services" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Services" list
    Click "Tạo mới" button
  END
  Enter "number" in "Order" with "${order}"
  Select file in "Ảnh" with "image.jpg"
  Click on "ENGLISH" tab
  Enter "test name" in "Name" with "_RANDOM_"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click on "VIETNAM" tab
  Enter "test name" in "Name" with "_RANDOM_"
    ${name}=               Check Text                               _@Name@_
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

### Mission ###
Create a test data type in "Mission" list
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Mission" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Mission" list
    Click "Tạo mới" button
  END
  Enter "number" in "Order" with "_RANDOM_"
  Select file in "Ảnh" with "image.jpg"
  Click on "ENGLISH" tab
  Enter "test name" in "Name" with "_RANDOM_"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click on "VIETNAM" tab
  Enter "test name" in "Name" with "_RANDOM_"
    ${name}=               Check Text                               _@Name@_
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test data type in "Mission" list with "${name}" in data name
  ${name}=                 Get Random Text                          test name                 ${name}
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Mission" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Mission" list
    Click "Tạo mới" button
  END
  Enter "number" in "Order" with "_RANDOM_"
  Select file in "Ảnh" with "image.jpg"
  Click on "ENGLISH" tab
  Enter "test name" in "Name" with "_RANDOM_"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click on "VIETNAM" tab
  Enter "test name" in "Name" with "${name}"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test data type in "Mission" list with "${order}" in order
  ${name}=                 Get Random Text                          number                    ${order}
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Dữ liệu" page of "Thiết lập" menu
  IF    '${condition}' == 'True'
    Select on the "Mission" item line
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Dữ liệu" page with "Mission" list
    Click "Tạo mới" button
  END
  Enter "number" in "Order" with "${order}"
  Select file in "Ảnh" with "image.jpg"
  Click on "ENGLISH" tab
  Enter "test name" in "Name" with "_RANDOM_"
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click on "VIETNAM" tab
  Enter "test name" in "Name" with "_RANDOM_"
    ${name}=               Check Text                               _@Name@_
  Enter "paragraph" in "Description" with "_RANDOM_"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}
