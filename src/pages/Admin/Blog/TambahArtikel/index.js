import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import * as yup from 'yup';

import { Editor } from '@tinymce/tinymce-react';

import { IconAdd, IconBlogGradient, IconCloseBlack, IconNext } from '../../../../assets';
import { FooterTwo, NavbarAdmin, Sidebar } from '../../../../component';
import { usePostArticle } from '../../../../features/blog/usePostArticle';
import { ToastError, ToastSuccess } from '../../../../utils/toast';

const ErrorText = tw.p`
mt-2 text-red-500 text-sm
`;

const TambahArtikel = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [namaFileGambar, setNamaFileGambar] = useState('Headline Artikel.jpg');
  const [namaAvatar, setNamaAvatar] = useState('Avatar.jpg');
  const [isAddIconClicked, setIsAddIconClicked] = useState(false);
  const [newHashtag, setNewHashtag] = useState('');

  // Isi Artikel
  const [text, setText] = useState('');
  const [value, setValue] = useState('<p>TinyMCE editor text</p>');

  const { mutate: postArticle } = usePostArticle({
    onSuccess: () => {
      ToastSuccess('Berhasil menambahkan artikel');
      navigate(-1);
    },
  });

  const formik = useFormik({
    initialValues: {
      title_article: '',
      writers_name: '',
      avatar: '',
      image: '',
      categories: [],
      hashtags: [],
      contents_article: '',
    },
    onSubmit: () => {
      postArticle(formik.values);
    },
    validationSchema: yup.object().shape({
      title_article: yup.string().required('Judul artikel harus diisi'),
      writers_name: yup.string().required('Nama penulis harus diisi'),
      avatar: yup
        .string()
        .matches(/^data:image\/[^;]+;base64[^"]+$/, 'Format gambar tidak sesuai')
        .required('Gambar harus diuploud'),
      image: yup
        .string()
        .matches(/^data:image\/[^;]+;base64[^"]+$/, 'Format gambar tidak sesuai')
        .required('Gambar harus diuploud'),
      categories: yup.array().of(yup.string()).required().min(1, 'Pilih minimal 1 kategori'),
      hashtags: yup.array().of(yup.string()).required().min(1, 'Isi minimal 1 hastag'),
    }),
  });

  const handleForm = (event) => {
    const { target } = event;
    const { name, value } = target;

    if (name === 'image') {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        formik.setFieldValue(name, base64Data);
        setNamaFileGambar(file.name);
      };
      reader.readAsDataURL(file);
    } else if (name === 'avatar') {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        formik.setFieldValue(name, base64Data);
        setNamaAvatar(file.name);
      };
      reader.readAsDataURL(file);
    } else if (name === 'categories') {
      const selectedCategory = value;
      const categories = formik.values.categories;
      if (!categories.includes(selectedCategory)) {
        const updatedCategories = [...categories, selectedCategory];
        formik.setFieldValue(name, updatedCategories);
      }
    } else if (name === 'hashtags') {
      setNewHashtag(value);
    } else {
      formik.setFieldValue(name, value);
    }
  };

  const handleAddHashtag = () => {
    if (newHashtag.trim() !== '') {
      const isDuplicate = formik.values.hashtags.includes(newHashtag.trim());

      if (!isDuplicate) {
        const hashtags = [...formik.values.hashtags];
        hashtags.push(newHashtag.trim());
        formik.setFieldValue('hashtags', hashtags);
        setNewHashtag('');
      } else {
        ToastError('Hastag tidak boleh sama');
        return;
      }
    }
  };

  const removeHastag = (index) => {
    const updatedHashtags = [...formik.values.hashtags];
    updatedHashtags.splice(index, 1);
    formik.setFieldValue('hashtags', updatedHashtags);
  };

  const removeKategori = (index) => {
    const updatedCategories = [...formik.values.categories];
    updatedCategories.splice(index, 1);
    formik.setFieldValue('categories', updatedCategories);
  };

  return (
    <div>
      <div className='h-full bg-outline'>
        <Sidebar
          activeMenu={5}
          open={open}
          setOpen={setOpen}
        />
        <div
          className={`${open ? 'lg:ml-80 md:ml-28 ml-0' : 'lg:ml-24 md:ml-28 ml-0'}
                h-full p-7`}>
          <NavbarAdmin
            title={'Blog'}
            image={IconBlogGradient}
            open={open}
            setOpen={setOpen}
          />
          <div className='flex flex-wrap items-center gap-3 mb-[30px] pt-[120px]'>
            <Link
              to={'/admin/blog/'}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>
              Blog
            </Link>
            <img
              src={IconNext}
              alt='Icon Next'
            />
            <button className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Tambah Artikel</button>
          </div>
          <div className='flex flex-col'>
            <div className='-my-2'>
              <div className='inline-block w-full h-full py-2'>
                <form
                  className='bg-white border-b border-gray-200 shadow sm:rounded-lg'
                  onSubmit={formik.handleSubmit}>
                  <div className='w-full px-6 py-5 md:px-16 md:pt-10 md:pb-14'>
                    <div>
                      <h1 className='text-2xl text-[#2E3A44] font-bold'>Tambah Artikel</h1>
                      <h1 className='text-base text-[#A8A8A8] font-medium'>
                        Isi form dibawah untuk menambahkan artike baru ke halaman blog
                      </h1>
                    </div>
                    <div className='flex-row space-y-[30px] mt-[50px]'>
                      <div>
                        <label
                          for='JudulArtikel'
                          className='font-medium'>
                          Judul Artikel
                        </label>
                        <input
                          id='JudulArtikel'
                          type='text'
                          name='title_article'
                          onChange={handleForm}
                          placeholder='Masukan judul artikel'
                          className='w-full bg-[#F9FBFC] p-[10px] border border-[#E3E8F1] rounded-lg mt-[10px]'
                        />
                        {formik.errors.title_article && formik.touched.title_article && (
                          <ErrorText>{formik.errors.title_article}</ErrorText>
                        )}
                      </div>
                      <div>
                        <label
                          for='NamaPenulis'
                          className='font-medium'>
                          Nama Penulis
                        </label>
                        <input
                          id='NamaPenulis'
                          type='text'
                          name='writers_name'
                          onChange={handleForm}
                          placeholder='Masukan nama penulis'
                          className='w-full bg-[#F9FBFC] p-[10px] border border-[#E3E8F1] rounded-lg mt-[10px]'
                        />
                        {formik.errors.writers_name && formik.touched.writers_name && (
                          <ErrorText>{formik.errors.writers_name}</ErrorText>
                        )}
                      </div>
                      <div>
                        <label
                          for='Avatar'
                          className='font-medium'>
                          Avatar
                        </label>
                        <div className='flex flex-col items-center gap-1 mb-2 md:flex-row md:gap-4 md:mb-0'>
                          <div className='flex items-center gap-4 w-full md:w-[440px] bg-[#F9FBFC] p-[10px] border border-[#E3E8F1] rounded-lg mt-[10px] mb-[6px] relative '>
                            <input
                              type='file'
                              id='Avatar'
                              onChange={handleForm}
                              name='avatar'
                            />
                            <img
                              src={isAddIconClicked ? IconCloseBlack : IconAdd}
                              alt={isAddIconClicked ? 'Icon Close' : 'Icon Add'}
                              className='w-4'
                              onClick={() => {
                                setIsAddIconClicked(!isAddIconClicked);
                              }}
                            />
                            <p className='text-[#A8A8A8] text-[14px]'>Uploud avatar</p>
                          </div>
                          <span className='bg-[#A8A8A8] px-[20px] py-[6px] text-white rounded-full font-normal text-[10px] text-center'>
                            {namaAvatar}
                          </span>
                        </div>
                        <p className='text-[#737373 italic font-medium text-[10px]'>
                          * Upload dengan format JPG, JPEG dan ukuran maksimal 2 MB
                        </p>
                        {formik.errors.avatar && formik.touched.avatar && <ErrorText>{formik.errors.avatar}</ErrorText>}
                      </div>
                      <div>
                        <label
                          for='GambarJudul'
                          className='font-medium'>
                          Gambar Judul
                        </label>
                        <div className='flex flex-col items-center gap-1 mb-2 md:flex-row md:gap-4 md:mb-0'>
                          <div className='flex items-center gap-4 w-full md:w-[440px] bg-[#F9FBFC] p-[10px] border border-[#E3E8F1] rounded-lg mt-[10px] mb-[6px] relative '>
                            <input
                              type='file'
                              id='GambarJudul'
                              onChange={handleForm}
                              name='image'
                            />
                            <img
                              src={isAddIconClicked ? IconCloseBlack : IconAdd}
                              alt={isAddIconClicked ? 'Icon Close' : 'Icon Add'}
                              className='w-4'
                              onClick={() => {
                                setIsAddIconClicked(!isAddIconClicked);
                              }}
                            />
                            <p className='text-[#A8A8A8] text-[14px]'>Uploud gambar judul artikel</p>
                          </div>
                          <span className='bg-[#A8A8A8] px-[20px] py-[6px] text-white rounded-full font-normal text-[10px] text-center'>
                            {namaFileGambar}
                          </span>
                        </div>
                        <p className='text-[#737373 italic font-medium text-[10px]'>
                          * Upload dengan format JPG, JPEG dan ukuran maksimal 2 MB
                        </p>
                        {formik.errors.image && formik.touched.image && <ErrorText>{formik.errors.image}</ErrorText>}
                      </div>
                      <div>
                        <label
                          for='TextEditor'
                          className='font-medium'>
                          Isi Artikel
                        </label>
                        <div className='mt-[10px]'>
                          <Editor
                            apiKey='1k2t0rgsjvk01srbcjliekj7dccz9lzedkrc1xmtjjvryyx9'
                            id='TextEditor'
                            onEditorChange={(newValue, editor) => {
                              setValue(newValue);
                              setText(editor.getContent({ format: 'text' }));
                              formik.setFieldValue('contents_article', newValue);
                            }}
                            onInit={(evt, editor) => {
                              setText(editor.getContent({ format: 'text' }));
                            }}
                            init={{
                              plugins:
                                'a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinydrive tinymcespellchecker typography visualblocks visualchars wordcount',
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for='Kategori'
                          className='font-medium'>
                          Kategori
                        </label>
                        <select
                          id='Kategori'
                          onChange={handleForm}
                          name='categories'
                          className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-base rounded-lg  block p-[10px] appearance-none w-full max-w-[440px] mt-[10px]'>
                          <option
                            value={''}
                            disabled
                            selected>
                            Pilih kategori artikel
                          </option>
                          <option value={'Events'}>Events</option>
                          <option value={'Hiburan'}>Hiburan</option>
                          <option value={'Pariwisata'}>Pariwisata</option>
                          <option value={'Bisnis'}>Bisnis</option>
                          <option value={'Olahraga'}>Olahraga</option>
                          <option value={'Pendidikan'}>Pendidikan</option>
                          <option value={'Politik'}>Politik</option>
                          <option value={'Sosial'}>Sosial</option>
                          <option value={'Teknologi'}>Teknologi</option>
                        </select>
                        {formik.values.categories.map((data, index) => (
                          <div
                            key={index}
                            className='bg-[#F9FBFC] border border-[#E3E8F1] rounded-lg pl-[10px] pr-[31px] py-[6px] text-[#737373] mt-[10px] mr-2 inline-block relative'>
                            <p>{data}</p>
                            <img
                              src={IconCloseBlack}
                              alt='Icon Close'
                              className='absolute top-[10px] right-[12px] w-[10px] cursor-pointer'
                              onClick={() => removeKategori(index)}
                            />
                          </div>
                        ))}
                        {formik.errors.categories && formik.touched.categories && (
                          <ErrorText>{formik.errors.categories}</ErrorText>
                        )}
                      </div>
                      <div>
                        <label
                          for='Hastag'
                          className='font-medium'>
                          Hastag
                        </label>
                        <div className='flex gap-[15px] items-center'>
                          <input
                            id='Hastag'
                            placeholder='Tambah hastag'
                            name='hashtags'
                            onChange={handleForm}
                            className='w-full max-w-[385px] bg-[#F9FBFC] p-[10px] border border-[#E3E8F1] rounded-lg mt-[10px]'
                            value={newHashtag}
                          />
                          <div
                            className='bg-cherry w-[40px] h-[40px] rounded-lg mt-[10px] flex items-center justify-center cursor-pointer'
                            onClick={handleAddHashtag}>
                            <img
                              src={IconAdd}
                              alt='Icon Add'
                              className='w-4'
                            />
                          </div>
                        </div>
                        {formik.values.hashtags.map((data, index) => (
                          <div
                            key={index}
                            className='bg-[#F9FBFC] border border-[#E3E8F1] rounded-lg pl-[10px] pr-[31px] py-[6px] text-[#737373] mt-[10px] mr-2 inline-block relative'>
                            <p>{data}</p>
                            <img
                              src={IconCloseBlack}
                              alt='Icon Close'
                              className='absolute top-[10px] right-[12px] w-[10px] cursor-pointer'
                              onClick={() => removeHastag(index)}
                            />
                          </div>
                        ))}
                        {formik.errors.hashtags && formik.touched.hashtags && (
                          <ErrorText>{formik.errors.hashtags}</ErrorText>
                        )}
                      </div>
                      <div className='flex items-center justify-end gap-5'>
                        <button className='px-[20px] py-2 bg-[#F9FBFC] border border-[#E3E8F1] font-normal text-xs rounded-lg'>
                          Batal
                        </button>
                        <button
                          className='px-[20px] py-2 bg-[#00CDB4] text-white font-normal text-xs rounded-lg'
                          type='submit'>
                          Simpan
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <FooterTwo />
      </div>
    </div>
  );
};

export default TambahArtikel;
