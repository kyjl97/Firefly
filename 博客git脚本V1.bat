@echo off
chcp 936 >nul
cd /d "%~dp0"
title ���͹����˵�

:menu
cls
echo.
echo ====================================================
echo            ��ǿ���͡�kyjl97.github.io���������˵�
echo ====================================================
echo.
echo  [1] ��������YAML ģ��
echo  [2] �������ع���Ԥ��
echo  [3] Git �ύ�����ʹ���
echo  [4] �˳�����
echo.
echo ====================================================
choice /c 1234 /n /m "��ѡ����� [1-4]��"

if errorlevel 4 goto exit
if errorlevel 3 goto gitpush
if errorlevel 2 goto preview
if errorlevel 1 goto template
goto menu

REM 1. ���� YAML ����ģ��
:template
cls
echo.
echo ==============================================
echo          �������� YAML ģ��...
echo ==============================================
echo.
node scripts/add-frontmatter.cjs
echo.
echo ==============================================
echo      ģ��������ɣ����� Typora �б༭
echo ==============================================
echo.
pause
goto menu

REM 2. �������ع���Ԥ��
:preview
cls
echo.
echo ==============================================
echo         ������������Ԥ������
echo ==============================================
echo.
echo  Ԥ����ַ��http://localhost:4321
echo  ֹͣԤ������ Ctrl + C
echo.
start http://localhost:4321
npm run dev
echo.
pause
goto menu

REM 3. Git �ύ�����ʹ��� (������)
:gitpush
cls
echo.
echo ==============================================
echo           Git �ύ������
echo ==============================================
echo.
echo [1/4] ���ڼ���ļ����...
echo.
git status --short
echo.
if errorlevel 1 (
    echo ??  ���棺δ��⵽ Git �ֿ�����ļ����
    echo.
    pause
    goto menu
)

echo [2/4] ׼���ύ��Ϣ...
echo.
REM ��ȡ��ǰʱ�䲢��ʽ�� (���� Windows Ĭ�ϸ�ʽ)
for /f "tokens=1-6 delims=/-: " %%a in ("%date% %time%") do (
    set "year=%%c"
    set "month=%%a"
    set "day=%%b"
    set "hour=%%d"
    set "minute=%%e"
)
REM ���㴦�� (��ֹ��λ��ʱ����ʾ�쳣)
if %hour% lss 10 set "hour=0%hour%"
set "default_msg=���²������� %year%-%month%-%day% %hour%:%minute%"

set "commit_msg="
set /p "commit_msg=�������ύ��ע (ֱ�ӻس�ʹ��Ĭ��: %default_msg%)��"

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

echo.
echo ==============================================
echo           ? Git �ύ������ɣ�
echo ==============================================
echo.
pause
goto menu

REM 4. �˳�����
:exit
echo.
echo �ټ���
echo.
timeout /t 1 /nobreak >nul
exit