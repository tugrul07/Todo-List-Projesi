# Gereksimler: 
Daha önceden Html’i oluşturulmuş Todo List Sayfasında yapılacak olan işlemler: 

•	Todo Giriniz kısmına girilen inputlar Arayüzde bu alana eklenmeli.

 <ul class="list-group">
               </ul>
               
•	Arayüze eklenen bu Todolar aynı zamanda senkron bir şekilde Local Storage ‘a eklenmeli.

•	Eğer kullanıcı boş ya da null bir değer girerse Sayfanın bu alanında bir hata Pop-Up’ı gösterilerek kullanıcı uyarılmalı. Ve aynı şekilde başarılı bir giriş yapıldığında da bir Pop-Up gösterilmeli.

<div class="card-body">
                    <form id="todoAddForm" class="mt-2">
                        <input type="text" class="form-control mt-2" id="todoName" aria-describedby="todo"
                            placeholder="Todo Giriniz">
                        <button id="todoAddButton" type="submit" class="btn btn-primary mt-4 btn-sm">
                            Todo Ekleyin</button>
                    </form>

                    <hr> 
<!— Pop-up lar bu alana eklenmeli -->
                    <!-- <div class="alert alert-primary" role="alert">
                       This is a primary alert—check it out!
                    </div> -->
                </div>


•	Arayüze eklenen Todoların sağındaki Çarpı ikonuna basıldığında ilgili Todoyu arayüzden ve Local Storage’dan kaldırmalı.

•	Tüm Todoları Temizle butonuna basıldığında Arayüzdeki ve Local Storage’daki tüm Todolar kaldırılmalı.

•	Kullanıcı eğer herhangi bir Todo yokken bu silme işlemlerini yapmaya kalkarsa yine ilgili alana Pop-Up eklenmeli.

•	Todo Arayınız kısmına girilen değerler ile Arayüzde Todo filtrelemesi yapılmalı.

•	Yine aynı şekilde bu işlemi hiçbir Todo yokken yapılmasını engellemek için ilgili alana Pop-Up eklenmeli.

