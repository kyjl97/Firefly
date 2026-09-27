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
echo  [1] �ƶ����²��򿪷�������
echo  [2] ��������YAML ģ��
echo  [3] �������ع���Ԥ��
echo  [4] Git �ύ�����ʹ���
echo  [5] �˳�����
echo.
echo ====================================================
choice /c 12345 /n /m "��ѡ����� [1-5]��"

if errorlevel 5 goto exit
if errorlevel 4 goto gitpush
if errorlevel 3 goto preview
if errorlevel 2 goto template
if errorlevel 1 goto move_and_cover
goto menu

REM 1. �ƶ����²��򿪷�������
:move_and_cover
cls
echo.
echo ==============================================
echo      �����ƶ����²�׼����������...
echo ==============================================
echo.

set "source=D:\project2026\zhishiku\03_Output"
set "dest=D:\project2026\fuwari\src\content\posts"
set "gemini_url=https://gemini.google.com/gem/1Aj6WWk5xdZb8af0pNSF5yvMatOakGmHd?usp=sharing"

set moved=0
set already=0
set skipped=0

for %%f in ("%source%\*.md") do (
    if /i not "%%~nf"=="OUTPUT_RULES" (
        if exist "%dest%\%%~nxf" (
            echo �Ѵ���: %%~nxf
            move /y "%%f" "%dest%\" >nul 2>&1
            set /a already+=1
        ) else (
            echo �ƶ�: %%~nxf
            move /y "%%f" "%dest%\" >nul 2>&1
            if !errorlevel! equ 0 (
                echo ���ڸ������ݵ�������...

                powershell -Command "$content = Get-Content '%dest%\%%~nxf' -Raw -Encoding UTF8; $start = $content.IndexOf('---', 12); if($start -gt 0){$content = $content.Substring($start+3)}; $content = $content.Substring(0, [Math]::Min(5000, $content.Length)); Set-Clipboard -Value $content; Write-Host '�Ѹ���'"

                echo ���ڴ� Gemini ��ͼ��ַ...
                start "" "%gemini_url%"

                set /a moved+=1
            )
        )
    ) else (
        echo ����: %%~nxf
        set /a skipped+=1
    )
)

echo.
echo ��ɣ������� %moved% �����Ѵ��� %already% �������� %skipped% ��
echo.
pause
goto menu

REM 2. ���� YAML ����ģ��
:template
cls
echo.
echo ==============================================
echo          �������� YAML ģ��...
echo ==============================================
echo.
cd /d D:\project2026\fuwari
node scripts/add-frontmatter.cjs
echo.
echo ==============================================
echo      ģ��������ɣ����� Typora �б༭
echo ==============================================
echo.
pause
goto menu

REM 3. �������ع���Ԥ��
:preview
cls
echo.
echo ==============================================
echo         ������������Ԥ������
echo ==============================================
echo.
cd /d D:\project2026\fuwari
echo  Ԥ����ַ��http://localhost:4321
echo  ֹͣԤ������ Ctrl + C
echo.
start http://localhost:4321
npm run dev
echo.
pause
goto menu

REM 4. Git �ύ�����ʹ���
:gitpush
cls
echo.
echo ==============================================
echo           Git �ύ������
echo ==============================================
echo.
cd /d D:\project2026\fuwari
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
for /f "tokens=1-6 delims=/-: " %%a in ("%date% %time%") do (
    set "year=%%c"
    set "month=%%a"
    set "day=%%b"
    set "hour=%%d"
    set "minute=%%e"
)
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
if errorlevel 1 (
    echo ���ͱ��ܾ���������ȡԶ�̸���...
    git pull --rebase
    git push
)

echo.
echo ==============================================
echo           ? Git �ύ������ɣ�
echo ==============================================
echo.
pause
goto menu

REM 5. �˳�����
:exit
echo.
echo �ټ���
echo.
timeout /t 1 /nobreak >nul
exit