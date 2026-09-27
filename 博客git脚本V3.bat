@echo off
chcp 936 >nul
cd /d "%~dp0"
title ���ͷ�������

:menu
cls
echo.
echo ====================================================
echo              ���ͷ������� - kyjl97.github.io
echo ====================================================
echo.
echo  [1] ���� YAML ģ��
echo  [2] Git �ύ������
echo  [3] �������ؿ���Ԥ��
echo  [4] �˳�
echo.
echo ====================================================
choice /c 1234 /n /m "��ѡ�� [1-4]��"

if errorlevel 4 goto exit
if errorlevel 3 goto preview
if errorlevel 2 goto gitpush
if errorlevel 1 goto template
goto menu

:template
cls
echo.
echo ==============================================
echo              �������� YAML ģ��...
echo ==============================================
echo.
cd /d D:\project2026\fuwari
node scripts/add-frontmatter.cjs
echo.
echo ==============================================
echo          ������ɣ����� Typora �б༭
echo ==============================================
echo.
pause
goto menu

:gitpush
cls
echo.
echo ==============================================
echo               Git �ύ������
echo ==============================================
echo.
cd /d D:\project2026\fuwari
echo [1/4] ���ڼ���ļ��Ķ�...
echo.
git status --short
echo.
if errorlevel 1 (
    echo ��ʾ��û�м�⵽�ļ��Ķ�
    echo.
    pause
    goto menu
)

echo [2/4] ����׼���ύ��Ϣ...
echo.
for /f "tokens=1-6 delims=/-: " %%a in ("%date% %time%") do (
    set "year=%%c"
    set "month=%%a"
    set "day=%%b"
    set "hour=%%d"
    set "minute=%%e"
)
if %hour% lss 10 set "hour=0%hour%"
set "default_msg=���²��� %year%-%month%-%day% %hour%:%minute%"

set "commit_msg="
set /p "commit_msg=�������ύ��Ϣ��ֱ�Ӱ��س�ʹ��Ĭ����Ϣ����"

if not defined commit_msg (
    set "commit_msg=%default_msg%"
)

echo.
echo [3/4] �����ύ��"%commit_msg%"
echo.
git add .
git commit -m "%commit_msg%"

echo.
echo [4/4] �������͵�Զ�ֿ̲�...
echo.
git push
if errorlevel 1 (
    echo ����ʧ�ܣ�������ȡ���º�����...
    git pull --rebase
    git push
)

echo.
echo ==============================================
echo               ������ɣ�
echo ==============================================
echo.
pause
goto menu

:preview
cls
echo.
echo ==============================================
echo             �������ؿ���Ԥ��
echo ==============================================
echo.
cd /d D:\project2026\fuwari
echo  Ԥ����ַ��http://localhost:4321
echo  �޸��ļ�����ҳ��ʵʱ����
echo  �� Ctrl + C ֹͣ��������
echo.
start "" http://localhost:4321
npm run dev
echo.
pause
goto menu

:exit
echo.
echo ���˳���
echo.
exit /b 0
