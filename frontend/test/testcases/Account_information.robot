*** Settings ***
Resource               ../keywords/common.robot
Test Setup             Setup
Test Teardown          Tear Down

*** Test Cases ***
### Link to testcases https://docs.google.com/spreadsheets/d/1R_jW5GBVBaMy7YgNKJQ2Ha5xW12Vn0nRzOHE0-OsyF8/edit#gid=1338885496 ###

### Verify the User Interface of the 'Thông tin cá nhân' page ###
AI_01 Verify the User Interface in "Thông tin cá nhân" page
  [Tags]                                                                                               MainPage                 UI                     Smoketest
  Login to admin
  When Click "Thông tin cá nhân" line in the avatar's account
  Then Heading should contain "Thông tin cá nhân" inner text
  Then Webpage should contain the profile information group with name and role
  Then Webpage should contain "THÔNG TIN CÁ NHÂN" tab
  Then Webpage should contain "ĐỔI MẬT KHẨU" tab

AI_02 Verify the User Interface of "THÔNG TIN CÁ NHÂN" tab
  [Tags]                                                                                               MainPage                  UI                     Smoketest
  Login to admin
  When Click "Thông tin cá nhân" line in the avatar's account
  Then Webpage should contain "Họ và tên" input field
  Then Webpage should contain "Email" input field
  Then Webpage should contain "Số điện thoại" input field
  Then Webpage should contain "Ngày sinh" input field
  Then Webpage should contain "Vị trí" select field
  Then Webpage should contain "Mô tả" input field
  Then Webpage should contain "Lưu lại" button
  Then Webpage should contain "Huỷ bỏ" button

AI_03 Verify the User Interface of "ĐỔI MẬT KHẨU" tab
  [Tags]                                                                                                MainPage                   UI                     Smoketest
  Login to admin
  When Click "Thông tin cá nhân" line in the avatar's account
  When Click on "ĐỔI MẬT KHẨU" tab
  Then Webpage should contain "Mật khẩu" input field
  Then Webpage should contain "Mật khẩu mới" input field
  Then Webpage should contain "Xác nhận mật khẩu" input field
  Then Webpage should contain "Đổi mật khẩu" button
  Then Webpage should contain "Huỷ bỏ" button

### Verify that change the account information by interacting with "THÔNG TIN TÀI KHOẢN" page ###
AI_04 Verify the change account's information by editing in "Họ và tên" field
  [Tags]                                                                                                ChangeInfo
  Go to "THÔNG TIN TÀI KHOẢN" page
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Thành công" popup
  Then Data's information in "Họ và tên" should be equal "_@Họ và tên@_"
  When Enter "test name" in "Họ và tên" with "${name_admin}"
  When Click "Lưu lại" button

AI_05 Verify the change account's information by editing in "Email" field
  [Tags]                                                                                                ChangeInfo
  Go to "THÔNG TIN TÀI KHOẢN" page
  When Enter "email" in "Email" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Thành công" popup
  Then Data's information in "Email" should be equal "_@Email@_"
  When Enter "email" in "Email" with "${email_admin}"
  When Click "Lưu lại" button

AI_06 Verify the change account's information by editing in "Số điện thoại" field
  [Tags]                                                                                                ChangeInfo
  Go to "THÔNG TIN TÀI KHOẢN" page
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Thành công" popup
  Then Data's information in "Số điện thoại" should be equal "_@Số điện thoại@_"
  When Enter "phone" in "Số điện thoại" with "${phone_admin}"
  When Click "Lưu lại" button

AI_07 Verify the change account's information by editing in "Ngày sinh" field
  [Tags]                                                                                                ChangeInfo
  Go to "THÔNG TIN TÀI KHOẢN" page
  When Click "date" in "Ngày sinh" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Thành công" popup
  Then Data's information in "Ngày sinh" should be equal "_@Ngày sinh@_"

AI_08 Verify the change account's information by editing in "Vị trí" field
  [Tags]                                                                                                ChangeInfo
  Go to "THÔNG TIN TÀI KHOẢN" page
  When Click select "Vị trí" with "Tester"
  When Click "Lưu lại" button
  Then User look message "Thành công" popup
  Then Data's information in "Vị trí" should be equal "_@Vị trí@_"

AI_09 Verify the change account's information by editing in "Mô tả" field
  [Tags]                                                                                                ChangeInfo
  Go to "THÔNG TIN TÀI KHOẢN" page
  When Enter "text" in textarea "Mô tả" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Thành công" popup
  Then Data's information in "Mô tả" should be equal "_@Mô tả@_"

### Verify that change the account information by leaving a blank field ###
AI_11 Verify the changing information by leaving the blank field in "Họ và tên"
  [Tags]                                                                                                BlankField
  Go to "THÔNG TIN TÀI KHOẢN" page
  When Enter "test name" in "Họ và tên" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập họ và tên" displayed under "Họ và tên" field

AI_12 Verify the changing information by leaving the blank field in "Email"
  [Tags]                                                                                                BlankField
  Go to "THÔNG TIN TÀI KHOẢN" page
  When Enter "email" in "Email" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập email" displayed under "Email" field

AI_13 Verify the changing information by leaving the blank field in "Số điện thoại"
  [Tags]                                                                                                BlankField
  Go to "THÔNG TIN TÀI KHOẢN" page
  When Enter "phone" in "Số điện thoại" with ""
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng nhập số điện thoại" displayed under "Số điện thoại" field

AI_14 Verify the changing information by leaving the blank field in "Ngày sinh"
  [Tags]                                                                                                BlankField
  Go to "THÔNG TIN TÀI KHOẢN" page
  When Click on cross icon in select "Ngày sinh"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chọn ngày sinh" displayed under "Ngày sinh" field

AI_15 Verify the changing information by leaving the blank field in "Vị trí"
  [Tags]                                                                                                BlankField
  Go to "THÔNG TIN TÀI KHOẢN" page
  When Click on cross icon in select "Vị trí"
  When Click "Lưu lại" button
  Then Required message "Xin vui lòng chọn vị trí" displayed under "Vị trí" field

AI_16 Verify the changing information by leaving the blank field in "Mô tả"
  [Tags]                                                                                                BlankField
  Go to "THÔNG TIN TÀI KHOẢN" page
  When Enter "text" in textarea "Mô tả" with ""
  When Click "Lưu lại" button
  Then User look message "Thành công" popup

### Verify the button function in "Thông tin tài khoản" page ###
AI_17 Verify the "Huỷ bỏ" button
  [Tags]                                                                                                Button                      Smoketest
  Go to "THÔNG TIN TÀI KHOẢN" page
  When Enter "test name" in "Họ và tên" with "_RANDOM_"
  When Click "Huỷ bỏ" button
  When Click "Thông tin cá nhân" line in the avatar's account
  Then Data's information in "Họ và tên" should not be equal "_@Họ và tên@_"

*** Keywords ***

Go to "THÔNG TIN TÀI KHOẢN" page
  Login to admin
  Click "Thông tin cá nhân" line in the avatar's account
