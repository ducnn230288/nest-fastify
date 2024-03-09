*** Settings ***
Resource               ../keywords/common.robot
Test Setup             Setup
Test Teardown          Tear Down
Library                DateTime

*** Test Cases ***
### Link to testcases https://docs.google.com/spreadsheets/d/1R_jW5GBVBaMy7YgNKJQ2Ha5xW12Vn0nRzOHE0-OsyF8/edit#gid=1885039585 ###

### Verify the User Interface of the 'Danh sách Người Dùng' page ###
CL_01 Verify the User Interface of "Danh sách Người Dùng" page
  [Tags]                                                                                                MainPage                   UI                     Smoketest
  Login to admin
  When Click "Người Dùng" menu
  Then Heading should contain "Danh sách Người dùng" inner text
  Then Confirm locating exactly in "Danh sách" page of "Người Dùng" menu
  Then Webpage should contain the list data from database
  Then Webpage should contain the search function
  Then Webpage should contain "Họ và tên" column with sort and search function
  Then Webpage should contain "Vị trí" column with sort and search function
  Then Webpage should contain "Vai trò" column with sort function
  Then Webpage should contain "Email" column with sort and search function
  Then Webpage should contain "Số điện thoại" column with sort and search function
  Then Webpage should contain "Created" column with sort and search function
  Then Webpage should contain "Hoạt động" column
  Then Webpage should contain "Role" group
  Then Webpage should contain "Tạo mới" button

#CL_02 Verify the function changing the number of accounts show in each list
#  [Tags]                                                                                                MainPage                   UI   BUG2
#  Login to admin
#  When Click "Người Dùng" menu
#  When Click on "second" selection to change the number of data show in list and check
#  When Click on "third" selection to change the number of data show in list and check
#  When Click on "fourth" selection to change the number of data show in list and check
#  When Click on "fifth" selection to change the number of data show in list and check
#
#CL_03 Verify the function of changing the page's number the list of account
#  [Tags]                                                                                                MainPage                   UI   BUG2
#  Go to "Danh sách Người Dùng" page
#  Then Check the amount of page list
#  ${Last_name}=                 Get data in the last row
#  When Create a test account with "Tester" type
#  When Move to the "next" page
#  ${First_name}=                Get data in the first row
#  Then Should Be Equal               ${First_name}                ${Last_name}
#  When Move to the "previous" page
#  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
#  When Move to the last page and check

CL_04 Verify the highlight table line function after operated
  [Tags]                                                                                                MainPage                   UI
  Create a test account with "Tester" type
  When Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Click "Huỷ bỏ" button
  Then "_@Họ và tên@_" table line should be highlighted
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

### Verify the User Interface of detail information's account page ###
CL_05 Verify that navigating to the right "Detail-information" page
  [Tags]                                                                                                DetailInfo
  ${today}=                                                                                             Get Current Date           local                  result_format=%d-%m-%Y
  Create a test account with "Tester" type
  When Click on the "Sửa" button in the "_@Họ và tên@_" table line
  Then Data's information in "Họ và tên" should be equal "_@Họ và tên@_"
  Then Data's information in "Email" should be equal "_@Email@_"
  Then Data's information in "Số điện thoại" should be equal "_@Số điện thoại@_"
  Then Data's information in "Ngày sinh" should be equal "_@Ngày sinh@_"
  Then Data's information in "Vị trí" should be equal "_@Vị trí@_"
  Then Data's information in "Ngày đầu đi làm" should be equal "${today}"
  Then Data's information in "Mô tả" should be equal "_@Mô tả@_"
  When Click "Huỷ bỏ" button
  Then "_@Họ và tên@_" table line should be highlighted
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

### Verify the activate function ###
CL_06 Verify that switch off account when clicking on "Đã kích hoạt" button
  [Tags]                                                                                                Activate
  Create a test account with "Tester" type
  When Click on the "Đã kích hoạt" button in the "_@Họ và tên@_" table line
#  Then User look message "Cập nhật thành công" popup
  Then The status button in the "_@Họ và tên@_" table line should change to "Đã vô hiệu hóa"
  #Click on the "Sửa" button in the "_@Họ và tên@_" table line
  #Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_07 Verify that switch off account when clicking on "Đã kích hoạt" button
  [Tags]                                                                                                Activate
  Create a test account with "Tester" type
  When Click on the "Đã kích hoạt" button in the "_@Họ và tên@_" table line
  When Click on the "Đã vô hiệu hóa" button in the "_@Họ và tên@_" table line
#  Then User look message "Cập nhật thành công" popup
  Then The status button in the "_@Họ và tên@_" table line should change to "Đã kích hoạt"
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

### Verify the search function ###
CL_09 Verify the function of input search box
  [Tags]                                                                                                Search
  ${Account1}=                                  Create a test account with "Tester" type
  Create a test account with "Tester" type
  When Enter "text" in placeholder "Tìm kiếm" with "${Account1}"
  Then "${Account1}" should be visible in the table line
  Then "_@Họ và tên@_" should not be visible in the table line
  When Click on the "Xóa" button in the "${Account1}" table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_10 Verify the function of input search box with the code name that was not existed
  [Tags]                                                                                                Search
  Create a test account with "Tester" type
  When Enter "text" in placeholder "Tìm kiếm" with "_RANDOM_"
  Then Table line should show empty
  When Click on cross icon in input search box
  Then "_@Họ và tên@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_11 Verify the function of input search box when cancel action
  [Tags]                                                                                                Search
  ${Account1}=                                  Create a test account with "Tester" type
  Create a test account with "Tester" type
  When Enter "text" in placeholder "Tìm kiếm" with "${Account1}"
  Then "${Account1}" should be visible in the table line
  Then "_@Họ và tên@_" should not be visible in the table line
  When Enter "text" in placeholder "Tìm kiếm" with ""
  Then "_@Họ và tên@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
  When Click on the "Xóa" button in the "${Account1}" table line

CL_12 Verify the function of input search box when cancel action
  [Tags]                                                                                                Search                    Name
  ${Account1}=                                  Create a test account with "Tester" type
  Create a test account with "Developer" type
  When Click on magnifier icon in "Họ và tên" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "${Account1}"
  When Click "Tìm kiếm" button
  Then "${Account1}" should be visible in the table line
  Then "_@Họ và tên@_" should not be visible in the table line
  When Click on the "Xóa" button in the "${Account1}" table line
  When Click on magnifier icon in "Họ và tên" table cell
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_13 Verify the function of input search box when cancel action
  [Tags]                                                                                                Search                    Name
  Create a test account with "Tester" type
  When Click on magnifier icon in "Họ và tên" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "_RANDOM_"
  When Click "Tìm kiếm" button
  Then Table line should show empty
  When Click on magnifier icon in "Họ và tên" table cell
  When Click "Cài lại" button
  Then "_@Họ và tên@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_14 Verify the function of input search box when cancel action
  [Tags]                                                                                                Search                    Name
  ${Account1}=                                                                                          Create a test account with "Tester" type
  Create a test account with "Tester" type
  When Click on magnifier icon in "Họ và tên" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "${Account1}"
  When Click "Tìm kiếm" button
  Then "${Account1}" should be visible in the table line
  Then "_@Họ và tên@_" should not be visible in the table line
  Then "${Account1}" should be visible in the table line
  When Click on magnifier icon in "Họ và tên" table cell
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
  When Click on the "Xóa" button in the "${Account1}" table line

CL_15 Verify the function of input search box when cancel action
  [Tags]                                                                                                Search                    Role
  ${Account1}=                                  Create a test account with "Tester" type
  Create a test account with "Developer" type
  When Click on magnifier icon in "Vị trí" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "Tester"
  When Click radio "Tester" in search box
  When Click "Tìm kiếm" button
  Then "${Account1}" should be visible in the table line
  Then "_@Họ và tên@_" should not be visible in the table line
  When Click on the "Xóa" button in the "${Account1}" table line
  When Click on magnifier icon in "Vị trí" table cell
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_16 Verify the search function of the magnifier icon in "Vị trí" column by entering a "Vị trí" that was not existed
  [Tags]                                                                                                Search                    Role
  Create a test account with "Tester" type
  When Click on magnifier icon in "Vị trí" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "_RANDOM_"
  When Click "Tìm kiếm" button
  Then The list of radio is empty
  When Click on magnifier icon in "Vị trí" table cell
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_17 Verify the function of "Cài lại" button when using the magnifier icon in "Vị trí" cell
  [Tags]                                                                                                Search                    Role
  ${Account1}=                                  Create a test account with "Tester" type
  Create a test account with "Developer" type
  When Click on magnifier icon in "Vị trí" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "Tester"
  When Click radio "Tester" in search box
  When Click "Tìm kiếm" button
  Then "${Account1}" should be visible in the table line
  Then "_@Họ và tên@_" should not be visible in the table line
  When Click on magnifier icon in "Vị trí" table cell
  When Click "Cài lại" button
  Then "_@Họ và tên@_" should be visible in the table line
  Then All radio selection in "Vị trí" should be uncheck
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
  When Click on the "Xóa" button in the "${Account1}" table line

CL_18 Verify the search function of the magnifier icon in "Vị trí" column when cancel action with "Cài lại" button
  [Tags]                                                                                                Search                    Role
  ${Account1}=                                  Create a test account with "Tester" type
  Create a test account with "Developer" type
  When Click on magnifier icon in "Vị trí" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "Tester"
  When Click radio "Tester" in search box
  When Click "Tìm kiếm" button
  Then "${Account1}" should be visible in the table line
  Then "_@Họ và tên@_" should not be visible in the table line
  When Click on magnifier icon in "Vị trí" table cell
  When Click "Cài lại" button
  Then "_@Họ và tên@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
  When Click on the "Xóa" button in the "${Account1}" table line

CL_19 Verify the search function of the magnifier icon in "Vị trí" column when cancel action with "Cài lại" button
  [Tags]                                                                                                Search                    Role
  ${Account1}=                                  Create a test account with "Tester" type
  ${Account2}=                                  Create a test account with "Developer" type
  Create a test account with "Business Analyst" type
  When Click on magnifier icon in "Vị trí" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "Tester"
  When Click radio "Tester" in search box
  When Click "Tìm kiếm" button
  Then "${Account1}" should be visible in the table line
  Then "${Account2}" should not be visible in the table line
  Then "_@Họ và tên@_" should not be visible in the table line
  When Click on magnifier icon in "Vị trí" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "Developer"
  When Click radio "Developer" in search box
  When Click "Tìm kiếm" button
  Then "${Account1}" should be visible in the table line
  Then "${Account2}" should be visible in the table line
  Then "_@Họ và tên@_" should not be visible in the table line
  When Click on magnifier icon in "Vị trí" table cell
  When Click "Cài lại" button
  Then "_@Họ và tên@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
  When Click on the "Xóa" button in the "${Account2}" table line
  When Click on the "Xóa" button in the "${Account1}" table line

CL_20 Verify the search function of the magnifier icon in "Email" column
  [Tags]                                                                                                Search                    Email
  ${Account1}=                                  Create a test account with "Tester" type
  Create a test account with "Developer" type
  When Click on magnifier icon in "Email" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "_@Email@_"
  When Click "Tìm kiếm" button
  Then "${Account1}" should not be visible in the table line
  Then "_@Họ và tên@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
  When Click on magnifier icon in "Email" table cell
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "${Account1}" table line

CL_21 Verify the search function of the magnifier icon in "Email" column by entering a "Email" that was not existed
  [Tags]                                                                                                Search                    Email
  Create a test account with "Tester" type
  When Click on magnifier icon in "Email" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "_RANDOM_"
  When Click "Tìm kiếm" button
  Then Table line should show empty
  When Click on magnifier icon in "Email" table cell
  When Click "Cài lại" button
  Then "_@Họ và tên@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_22 Verify the search function of the magnifier icon in "Email" column when cancel action with "Cài lại" button
  [Tags]                                                                                                Search                    Email
  ${Account1}=                                  Create a test account with "Tester" type
  Create a test account with "Developer" type
  When Click on magnifier icon in "Email" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "_@Email@_"
  When Click "Tìm kiếm" button
  Then "${Account1}" should not be visible in the table line
  Then "_@Họ và tên@_" should be visible in the table line
  When Click on magnifier icon in "Email" table cell
  When Click "Cài lại" button
  Then "${Account1}" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
  When Click on the "Xóa" button in the "${Account1}" table line

CL_23 Verify the search function of the magnifier icon in "Số điện thoại" column
  [Tags]                                                                                                Search                    PhoneNumber
  ${Account1}=                                  Create a test account with "Tester" type
  Create a test account with "Developer" type
  When Click on magnifier icon in "Số điện thoại" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "_@Số điện thoại@_"
  When Click "Tìm kiếm" button
  Then "${Account1}" should not be visible in the table line
  Then "_@Họ và tên@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
  When Click on magnifier icon in "Số điện thoại" table cell
  When Click "Cài lại" button
  When Click on the "Xóa" button in the "${Account1}" table line

CL_24 Verify the search function of the magnifier icon in "Số điện thoại" column by entering a "Số điện thoại" that was not existed
  [Tags]                                                                                                Search                    PhoneNumber
  Create a test account with "Tester" type
  When Click on magnifier icon in "Số điện thoại" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "0900000000"
  When Click "Tìm kiếm" button
  Then Table line should show empty
  When Click on magnifier icon in "Số điện thoại" table cell
  When Click "Cài lại" button
  Then "_@Họ và tên@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_25 Verify the search function of the magnifier icon in "Số điện thoại" column when cancel action with "Cài lại" button
  [Tags]                                                                                                Search                    PhoneNumber
  ${Account1}=                                  Create a test account with "Tester" type
  Create a test account with "Developer" type
  When Click on magnifier icon in "Số điện thoại" table cell
  When Enter "text" in search box placeholder "Tìm kiếm" with "_@Số điện thoại@_"
  When Click "Tìm kiếm" button
  Then "${Account1}" should not be visible in the table line
  Then "_@Họ và tên@_" should be visible in the table line
  When Click on magnifier icon in "Số điện thoại" table cell
  When Click "Cài lại" button
  Then "${Account1}" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
  When Click on the "Xóa" button in the "${Account1}" table line

CL_26 Verify the search by date function of the calendar icon in "Created" column
  [Tags]                                                                                                Search                    PhoneNumber
  ${Today}=                                                                                             Get Current Date          local                              result_format=%d-%m-%Y
  Create a test account with "Tester" type
  When Click on calendar icon in "Created" table cell
  When Enter date in placeholder "Ngày bắt đầu" with "${Today}"
  When Enter date in placeholder "Ngày kết thúc" with "${Today}"
  When Click "Tìm kiếm" button
  Then "_@Họ và tên@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

### Verify the search function ###
#CL_27 Verify the sort function when click on sort icon in "Họ và tên" column
#  [Tags]                                                                                                Sort  BUG2
#  Create a test account with "A" name
#  Create a test account with "Z" name
#  When Click on sort icon in "Họ và tên" table cell
#  Then "A" should be visible in the first table line
#  Then "Z" should not be visible in the first table line
#  When Click on sort icon in "Họ và tên" table cell
#  Then "A" should not be visible in the first table line
#  Then "Z" should be visible in the first table line
#  When Click on the "Xóa" button in the "Z" table line
#  When Click on the "Xóa" button in the "A" table line
#
#CL_28 Verify the sort function when click on sort icon in "Vị trí" column
#  [Tags]                                                                                                Sort   BUG2
#  ${Account1}=                                                                                          Create a test account with "Admin" type
#  Create a test account with "Vice Director" type
#  When Click on sort icon in "Vị trí" table cell
#  Then "${Account1}" should be visible in the first table line
#  Then "_@Họ và tên@_" should not be visible in the first table line
#  When Click on sort icon in "Vị trí" table cell
#  Then "_@Họ và tên@_" should not be visible in the first table line
#  Then "${Account1}" should be visible in the first table line
#  When Click on sort icon in "Vị trí" table cell
#  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
#  When Click on the "Xóa" button in the "${Account1}" table line
#
#CL_30 Verify the sort function when click on sort icon in "Vị trí" column
#  [Tags]                                                                                                Sort   BUG2
#  ${Account1}=                                                                                          Create a test account with "a@email.com" in email
#  Create a test account with "z@email.com" in email
#  When Click on sort icon in "Email" table cell
#  Then "${Account1}" should be visible in the first table line
#  Then "_@Họ và tên@_" should not be visible in the first table line
#  When Click on sort icon in "Email" table cell
#  Then "_@Họ và tên@_" should not be visible in the first table line
#  Then "${Account1}" should be visible in the first table line
#  When Click on sort icon in "Email" table cell
#  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
#  When Click on the "Xóa" button in the "${Account1}" table line

#CL_31 Verify the sort function when click on sort icon in "Vị trí" column
#  [Tags]                                                                                                Sort   BUG2
#  ${Account1}=                                                                                          Create a test account with "0111111111" in phone
#  Create a test account with "0999999999" in phone
#  When Click on sort icon in "Số điện thoại" table cell
#  Then "${Account1}" should be visible in the first table line
#  Then "_@Họ và tên@_" should not be visible in the first table line
#  When Click on sort icon in "Số điện thoại" table cell
#  Then "_@Họ và tên@_" should not be visible in the first table line
#  Then "${Account1}" should be visible in the first table line
#  When Click on sort icon in "Số điện thoại" table cell
#  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
#  When Click on the "Xóa" button in the "${Account1}" table line

CL_32 Verify the sort function when click on sort icon in "Vị trí" column
  [Tags]                                                                                                Sort
  Create a test account with "Tester" type
  When Click on sort icon in "Created" table cell
  Then "_@Họ và tên@_" should not be visible in the first table line
  When Click on sort icon in "Created" table cell
  Then "_@Họ và tên@_" should be visible in the first table line
  When Click on sort icon in "Created" table cell
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

### Verify that edit account's information ###
CL_33 Verify the User Interface of webpage after clicking on "Sửa" button
  [Tags]                                                                                                EditInfo                                    UI
  Create a test account with "Tester" type
  When Click on the "Sửa" button in the "_@Họ và tên@_" table line
  Then Heading should contain "Chỉnh sửa người dùng Super Admin" inner text
  Then Webpage should contain "Họ và tên" input field
  Then Webpage should contain "Email" input field
  Then Webpage should contain "Số điện thoại" input field
  Then Webpage should contain "Ngày sinh" input field
  Then Webpage should contain "Vị trí" select field
  Then Webpage should contain "Ngày đầu đi làm" input field
  Then Webpage should contain "Mô tả" input field
  Then Webpage should contain "Tải ảnh lên" image upload field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Huỷ bỏ" button
  Then Webpage should contain "Lưu và tạo mới" button
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_34 Verify the edit information function when change data in "Họ và tên" field
  [Tags]                                                                                                EditInfo
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Họ và tên@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_35 Verify the edit information function when change data in "Email" field
  [Tags]                                                                                                EditInfo
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Enter "email" in "Email" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Email@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_35_02 Verify the edit information function when change data in "Email" field with existence email
  [Tags]                                                                                                EditInfo
  ${Account1}=                                                                                          Create a test account with "Tester" type
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "${Account1}" table line
  When Enter "email" in "Email" with "_@Email@_"
  When Click "Lưu lại" button
  Then User look message "Địa chỉ email đã được sử dụng" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
  When Click on the "Xóa" button in the "${Account1}" table line

CL_36 Verify the edit information function when change data in "Số điện thoại" field
  [Tags]                                                                                                EditInfo
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then "_@Số điện thoại@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_36_02 Verify the edit information function when change data in "Số điện thoại" field with existence phone number
  [Tags]                                                                                                EditInfo
  ${Account1}=                                                                                          Create a test account with "Tester" type
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "${Account1}" table line
  When Enter "phone" in "Số điện thoại" with "_@Số điện thoại@_"
  When Click "Lưu lại" button
  Then User look message "Số điện thoại đã được sử dụng" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
  When Click on the "Xóa" button in the "${Account1}" table line

CL_37 Verify the edit information function when change data in "Ngày sinh" field
  [Tags]                                                                                                EditInfo
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Họ và tên@_" table line
  Then Data's information in "Ngày sinh" should be equal "_@Ngày sinh@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

#CL_37_02 Verify the edit information function when change data in "Ngày sinh" field with invalid data
#  [Tags]                                                                                                EditInfo   BUG3
#  ${today}=                                                                                             Get Current Date                           local                              result_format=%d-%m-%Y
#  Create a test account with "Tester" type
#  Click on the "Sửa" button in the "_@Họ và tên@_" table line
#  When Click "date" in "Ngày sinh" with "${today}"
#  Then Required message "Xin vui lòng chọn ngày sinh" displayed under "Ngày sinh" field
#  When Click "Huỷ bỏ" button
#  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_38 Verify the edit information function when change data in "Vị trí" field
  [Tags]                                                                                                EditInfo
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Click select "Vị trí" with "Developer"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Họ và tên@_" table line
  Then Data's information in "Vị trí" should be equal "Developer"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_39 Verify the edit information function when change data in "Ngày đầu đi làm" field
  [Tags]                                                                                                EditInfo
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  ${yesterday}=                                                                                         Get Current Date                             local                   - 1 day                        result_format=%d-%m-%Y
  When Click "date" in "Ngày đầu đi làm" with "${yesterday}"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Họ và tên@_" table line
  Then Data's information in "Ngày đầu đi làm" should be equal "${yesterday}"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_40 Verify the edit information function when change data in "Mô tả" field
  [Tags]                                                                                                EditInfo
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Sửa" button in the "_@Họ và tên@_" table line
  Then Data's information in "Mô tả" should be equal "_@Mô tả@_"
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_41 Verify the edit information function when change image in "Tải ảnh lên" field
  [Tags]                                                                                                EditInfo
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Select file in "Tải ảnh lên" with "image2.jpg"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_42 Verify the edit information function by leaving a blank field in "Họ và tên"
  [Tags]                                                                                                EditInfo                                     BlankField
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Enter "test name" in "Họ và tên" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập họ và tên" displayed under "Họ và tên" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_43 Verify the edit information function by leaving a blank field in "Email"
  [Tags]                                                                                                EditInfo                                     BlankField
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Enter "email" in "Email" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập email" displayed under "Email" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_44 Verify the edit information function by leaving a blank field in "Số điện thoại"
  [Tags]                                                                                                EditInfo                                     BlankField
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Enter "phone" in "Số điện thoại" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập số điện thoại" displayed under "Số điện thoại" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_45 Verify the edit information function by leaving a blank field in "Ngày sinh"
  [Tags]                                                                                                EditInfo                                     BlankField
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Click on cross icon in select "Ngày sinh"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chọn ngày sinh" displayed under "Ngày sinh" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_46 Verify the edit information function by leaving a blank field in "Vị trí"
  [Tags]                                                                                                EditInfo                                     BlankField
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Click on cross icon in select "Vị trí"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chọn vị trí" displayed under "Vị trí" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_47 Verify the edit information function by leaving a blank field in "Ngày đầu đi làm"
  [Tags]                                                                                                EditInfo                                     BlankField
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Click on cross icon in select "Ngày đầu đi làm"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chọn ngày đầu đi làm" displayed under "Ngày đầu đi làm" field
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_48 Verify the edit information function by leaving a blank field in "Mô tả"
  [Tags]                                                                                                EditInfo                                     BlankField
  Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Enter "text" in textarea "Mô tả" with ""
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

#CL_49 Verify the edit information function by leaving a blank field in "Ảnh đại diện"
#  [Tags]                                                                                                EditInfo                                     BlankField   BUG4
#  Create a test account with "Tester" type
#  Click on the "Sửa" button in the "_@Họ và tên@_" table line
#  When Click on cross icon inside image in "Tải ảnh lên"
#  When Click "Lưu lại" button
#  Then User look message "Vui lòng tải lên ảnh đại diện" popup
#  When Click "Huỷ bỏ" button
#  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_50 Verify the edit information function by change data and click on "Huỷ bỏ" button
  [Tags]                                                                                                EditInfo
  ${Account1}=                                                                                          Create a test account with "Tester" type
  Click on the "Sửa" button in the "_@Họ và tên@_" table line
  When Enter "test name" in "Họ và tên" with "_RAMDOM_"
  When Click "Huỷ bỏ" button
  Then "${Account1}" should be visible in the table line
  When Click on the "Xóa" button in the "${Account1}" table line

### Verify the delete account function ###
CL_51 Verify the delete account function
  [Tags]                                                                                                Delete
  Create a test account with "Tester" type
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line
  Then User look message "Xóa thành công" popup
  Then "_@Họ và tên@_" should not be visible in the table line

CL_52 Verify the cancel action button when delete account
  [Tags]                                                                                                Delete
  Create a test account with "Tester" type
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line with cancel
  Then "_@Họ và tên@_" should be visible in the table line
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

### Verify the creating account function ###
CL_53 Verify the "Tạo mới" button and the User Interface of this webpage
  [Tags]                                                                                                Create                                      UI
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  Then Heading should contain "Tạo mới người dùng Super Admin" inner text
  Then Webpage should contain "Họ và tên" input field
  Then Webpage should contain "Email" input field
  Then Webpage should contain "Số điện thoại" input field
  Then Webpage should contain "Ngày sinh" input field
  Then Webpage should contain "Vị trí" select field
  Then Webpage should contain "Ngày đầu đi làm" input field
  Then Webpage should contain "Mô tả" input field
  Then Webpage should contain "Tải ảnh lên" image upload field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Huỷ bỏ" button
  Then Webpage should contain "Lưu và tạo mới" button

CL_54 Verify that create a new account with "Tạo mới" button
  [Tags]                                                                                                Create                                         Valid
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_55 Verify that create a new account by entering invalid email
  [Tags]                                                                                                Create                                         Invalid
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "abc.abc.com"
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập địa chỉ email hợp lệ!" displayed under "Email" field

CL_56 Verify that create a new account by entering existence email
  [Tags]                                                                                                Create                                         Invalid
  ${Account1}=                                                                                          Create a test account with "Tester" type
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_@Email@_"
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then User look message "Địa chỉ email đã được sử dụng" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Account1}" table line

CL_57 Verify that create a new account by entering short password
  [Tags]                                                                                                Create                                         Invalid
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "password" in "Mật khẩu" with "Abc@123"
  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập tối thiểu 8 ký tự số!" displayed under "Mật khẩu" field

CL_58 Verify that create a new account by entering invalid password
  [Tags]                                                                                                Create                                         Invalid
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "text" in "Mật khẩu" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 kí tự đặc biệt" displayed under "Mật khẩu" field

CL_59 Verify that create a new account by entering different password between "Mật khẩu" and "Xác nhận mật khẩu"
  [Tags]                                                                                                Create                                         Invalid
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_RANDOM_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Hai mật khẩu bạn nhập không nhất quán!" displayed under "Nhập lại mật khẩu" field

#CL_60 Verify that create a new account by entering invalid phone number
#  [Tags]                                                                                                Create                                         Invalid   BUG2
#  Go to "Danh sách Người Dùng" page
#  When Click "Tạo mới" button
#  When Enter "test name" in "Họ và tên" with "_RANDOM_"
#  When Enter "email" in "Email" with "_RANDOM_"
#  When Enter "password" in "Mật khẩu" with "_RANDOM_"
#  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
#  When Enter "phone" in "Số điện thoại" with "345345345"
#  When Click "date" in "Ngày sinh" with "_RANDOM_"
#  When Click select "Vị trí" with "Tester"
#  When Click "date" in "Ngày đầu đi làm" with "today"
#  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
#  When Select file in "Tải ảnh lên" with "image.jpg"
#  When Click "Lưu lại" button
#  Then User look message "Vui lòng nhập số điện thoại hợp lệ" popup

CL_61 Verify that create a new account by entering exitstence phone number
  [Tags]                                                                                                Create                                         Invalid
  Go to "Danh sách Người Dùng" page
  ${Account1}=                                                                                          Create a test account with "Tester" type
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  When Enter "phone" in "Số điện thoại" with "_@Số điện thoại@_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then User look message "Số điện thoại đã được sử dụng" popup
  When Click "Huỷ bỏ" button
  When Click on the "Xóa" button in the "${Account1}" table line

CL_62 Verify that create a new account by entering invalid data in "Ngày sinh" field
  [Tags]                                                                                                Create                                      Invalid
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "date" in "Ngày sinh" with "today"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "_RANDOM_"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button


CL_63 Verify that create a new account by leaving a blank field in "Họ và tên"
  [Tags]                                                                                                Create                                      BlankField
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập họ và tên" displayed under "Họ và tên" field

CL_64 Verify that create a new account by leaving a blank field in "Email"
  [Tags]                                                                                                Create                                      BlankField
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập email" displayed under "Email" field

CL_65 Verify that create a new account by leaving a blank field in "Mật khẩu"
  [Tags]                                                                                                Create                                      BlankField
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_RANDOM_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập mật khẩu" displayed under "Mật khẩu" field

CL_66 Verify that create a new account by leaving a blank field in "Nhập lại mật khẩu"
  [Tags]                                                                                                Create                                      BlankField
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập nhập lại mật khẩu" displayed under "Nhập lại mật khẩu" field

CL_67 Verify that create a new account by leaving a blank field in "Số điện thoại"
  [Tags]                                                                                                Create                                      BlankField
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập số điện thoại" displayed under "Số điện thoại" field

CL_68 Verify that create a new account by leaving a blank field in "Ngày sinh"
  [Tags]                                                                                                Create                                      BlankField
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chọn ngày sinh" displayed under "Ngày sinh" field

CL_69 Verify that create a new account by leaving a blank field in "Vị trí"
  [Tags]                                                                                                Create                                      BlankField
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chọn vị trí" displayed under "Vị trí" field

CL_70 Verify that create a new account by leaving a blank field in "Ngày đầu đi làm"
  [Tags]                                                                                                Create                                      BlankField
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chọn ngày đầu đi làm" displayed under "Ngày đầu đi làm" field

CL_71 Verify that create a new account by leaving a blank field in "Mô tả"
  [Tags]                                                                                                Create                                      BlankField
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

CL_72 Verify that create a new account by leaving a blank field in "Tải ảnh lên"
  [Tags]                                                                                                Create                                      BlankField
  Go to "Danh sách Người Dùng" page
  When Click "Tạo mới" button
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Click "date" in "Ngày đầu đi làm" with "today"
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click on the "Xóa" button in the "_@Họ và tên@_" table line

*** Keywords ***
Go to "Danh sách Người Dùng" page
  Login to admin
  Click "Người Dùng" menu

Create a test account with "${type}" type
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Danh sách" page of "Người Dùng" menu
  IF    '${condition}' == 'True'
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Người Dùng" page
    Click "Tạo mới" button
  END
  Enter "test name" in "Họ và tên" with "_RANDOM_"
    ${text}=               Check Text             _@Họ và tên@_
    ${name}=               Set Variable           ${text}
  Enter "email" in "Email" with "_RANDOM_"
  Enter "password" in "Mật khẩu" with "_RANDOM_"
  Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  Enter "phone" in "Số điện thoại" with "_RANDOM_"
  Click "date" in "Ngày sinh" with "_RANDOM_"
  Click select "Vị trí" with "${type}"
  Click "date" in "Ngày đầu đi làm" with "today"
  Enter "text" in textarea "Mô tả" with "_RANDOM_"
  Select file in "Tải ảnh lên" with "image.jpg"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test account with "${name}" name
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Danh sách" page of "Người Dùng" menu
  IF    '${condition}' == 'True'
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Người Dùng" page
    Click "Tạo mới" button
  END
  Enter "test name" in "Họ và tên" with "${name}"
  Enter "email" in "Email" with "_RANDOM_"
  Enter "password" in "Mật khẩu" with "_RANDOM_"
  Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  Enter "phone" in "Số điện thoại" with "_RANDOM_"
  Click "date" in "Ngày sinh" with "_RANDOM_"
  Click select "Vị trí" with "Tester"
  Click "date" in "Ngày đầu đi làm" with "today"
  Enter "text" in textarea "Mô tả" with "_RANDOM_"
  Select file in "Tải ảnh lên" with "image.jpg"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN                 ${name}

Create a test account with "${email}" in email
  ${condition}=            Run Keyword And Return Status        Confirm locating exactly in "Danh sách" page of "Người Dùng" menu
  IF    '${condition}' == 'True'
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Người Dùng" page
    Click "Tạo mới" button
  END
  Enter "test name" in "Họ và tên" with "_RANDOM_"
    ${text}=               Check Text             _@Họ và tên@_
    ${name}=               Set Variable           ${text}
  Enter "email" in "Email" with "${email}"
  Enter "password" in "Mật khẩu" with "_RANDOM_"
  Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  Enter "phone" in "Số điện thoại" with "_RANDOM_"
  Click "date" in "Ngày sinh" with "_RANDOM_"
  Click select "Vị trí" with "Tester"
  Click "date" in "Ngày đầu đi làm" with "today"
  Enter "text" in textarea "Mô tả" with "_RANDOM_"
  Select file in "Tải ảnh lên" with "image.jpg"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}

Create a test account with "${phone}" in phone
  ${condition}=            Run Keyword And Return Status            Confirm locating exactly in "Danh sách" page of "Người Dùng" menu
  IF    '${condition}' == 'True'
    Click "Tạo mới" button
  ELSE
    Go to "Danh sách Người Dùng" page
    Click "Tạo mới" button
  END
  Enter "test name" in "Họ và tên" with "_RANDOM_"
    ${text}=               Check Text             _@Họ và tên@_
    ${name}=               Set Variable           ${text}
  Enter "email" in "Email" with "_RANDOM_"
  Enter "password" in "Mật khẩu" with "_RANDOM_"
  Enter "password" in "Nhập lại mật khẩu" with "_@Mật khẩu@_"
  Enter "phone" in "Số điện thoại" with "${phone}"
  Click "date" in "Ngày sinh" with "_RANDOM_"
  Click select "Vị trí" with "Tester"
  Click "date" in "Ngày đầu đi làm" with "today"
  Enter "text" in textarea "Mô tả" with "_RANDOM_"
  Select file in "Tải ảnh lên" with "image.jpg"
  Click "Lưu lại" button
  User look message "Tạo thành công" popup
  RETURN               ${name}
