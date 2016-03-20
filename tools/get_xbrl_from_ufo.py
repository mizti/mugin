import requests
import json
import os
import io
import shutil
import multiprocessing
from collections import defaultdict
from zipfile import ZipFile

proc = 1    # TODO:マルチプロセス制御（初期値：1並列）

def make_directory(dir_name):
    if not os.path.exists(dir_name):
        os.mkdir(dir_name)

def download_all_xbrl_files(info_dicts):
    # xbrl_filesのディレクトリが存在しないとき、作成する
    directory_path = os.getcwd()+'/xbrl_files/'
    make_directory(directory_path)
    mp_dict = defaultdict(dict)
    counter = 0

    for _id, info_dict in info_dicts.items():
        #分散処理用にデータを設定
        mp_dict[counter] = info_dict
        counter += 1

    p = 0
    jobs = []
    while(p < proc):
        job = multiprocessing.Process(target=_download_xbrl_file, args=(mp_dict,p,))
        jobs.append(job)
        job.start()
        p += 1

    [job.join() for job in jobs]

#is_yuho関数に当てはまる全ての企業×有報情報IDごとに取得する
def _download_xbrl_file(info_dicts,p):
    no = p
    directory_path = os.getcwd()+'/xbrl_files/'
    while(no < len(info_dicts)):
        info_dict = info_dicts[no]
        no += proc

        # 証券CDごとのディレクトリ作成
        company_path = directory_path + info_dict['cd'] + '/'
        ir_path = company_path + info_dict['id']
        make_directory(company_path)

        #　証券コード×IR情報ごとのディレクトリ作成
        if os.path.exists(ir_path):
            continue
        make_directory(ir_path)
        print('Process('+str(p + 1) + '):downloading:' + info_dict['update']+'_'+info_dict['title'])

        url = info_dict['url']
        r = requests.get(url)
        if r.ok:
            #Requestによりファイルを取得して、Unzipする
            r = requests.get(url)
            z = ZipFile(io.BytesIO(r.content))
            z.extractall(ir_path) # unzip the file and save files to path.

def download_json_url():
    search_directory = os.getcwd()+'/downloaded_info/'
    old_directory = search_directory + 'old/'
    make_directory(old_directory)
    count = 0
    for file_name in os.listdir(search_directory):
        if not u'.json' in file_name :continue
        print(file_name + ' loading...')
        with open(search_directory + file_name,'r') as of:
            info_dict = json.load(of)
        print('downliading:' + str(count) + '~' + str(count+len(info_dict)) )
        count += len(info_dict)

        download_all_xbrl_files(info_dict)
        shutil.move(search_directory + file_name, old_directory + file_name)

if __name__=='__main__':
    download_json_url()
