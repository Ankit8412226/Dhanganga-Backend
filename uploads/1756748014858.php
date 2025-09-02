<?php
 include "conn.php";
?> <!DOCTYPE html>
<html class="no-js" lang="zxx">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>DhanGanga Associate</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Favicon -->
    <link rel="icon" href="assets/images/favicon.webp">

    <!-- CSS ============================================ -->
    <link rel="stylesheet" href="assets/css/vendor/vendor.min.css">
    <link rel="stylesheet" href="assets/css/plugins/plugins.min.css">
    <link rel="stylesheet" href="assets/css/style.css">

    <!-- JavaScript ====================================== -->
    <!-- Load jQuery first -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <!-- Load jQuery Migrate (Optional, if used in your project) -->
    <script src="assets/js/vendor/jquery-migrate-3.3.0.min.js"></script>

    <!-- Plugins JS -->
    <script src="assets/js/plugins/plugins.min.js"></script>

    <!-- Main JS -->
    <script src="assets/js/main.js"></script>
</head>
<body>
    <div class="preloader-activate preloader-active open_tm_preloader">
        <div class="preloader-area-wrap">
            <div class="spinner d-flex justify-content-center align-items-center h-100">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        </div>
    </div>
   <?php include "header.php"?>

<br>
<br>
<br>
<?php
							        $sid=$_GET['id'];
                                    $query = "SELECT * FROM advc WHERE amain = '$sid'";
                                    $result = mysqli_query($connect, $query);
                                    $row = mysqli_fetch_assoc($result);
                                    ?>
  <!--========= Pricing Table Area Start ==========-->
            <div class="pricing-table-area section-space--pb_70 bg-gradient">
                <div class="pricing-table-title-area position-relative">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section-title-wrapper text-center section-space--mb_60 wow move-up">
                                    <h6 class="section-sub-title mb-20">Naye Soch Naya Kadam</h6>
                                    <h3 class="section-title"><span class="text-color-primary"><?php echo $row['las'];?> </span> </h3>
                                </div><?php $code=$row['code'];?> 
                            </div>
                        </div>
                    </div>
                </div>
        <!------ANother--------->
                <?php 
                
                if($code==0)
                {
                ?>
                
                <div class="pricing-table-content-area">
                    <div class="container">
                        <div class="row pricing-table-one">
                                                  </div>
                        </div>
                         <div class="pricing-table-content-area">
                    <div class="container">
                        <div class="row pricing-table-one">
                              <?php 
							  $aid=$_GET['id2'];
							  $at=$_GET['id'];
$query = "SELECT * FROM `advc`  where amain='$at' and atype='$aid'";
$result = mysqli_query($connect, $query);
while ($row = mysqli_fetch_assoc($result)) {
    
    ?>                              <div class="col-12 col-md-6 col-lg-4 col-xl-4 pricing-table pricing-table--popular wow move-up">
                                            
                       
                                <form class="contact-form"  action="adv1.php" enctype="multipart/form-data" method="POST">

								<div class="pricing-table__inner">
                                    <div class="pricing-table__header">
                                          <div class="pricing-table__image">
                                            <img src="admin/<?php echo $row['image'];?>" class="img-fluid" alt="" style="width:200px;height:170px;">
                                        </div>
                                        <h6 class="sub-title"><?php echo $row['aname'];?></h6>
                                         <p><?php echo $row['bio'];?></p>

                                      
                                        <div class="pricing-table__price-wrap">
                                            <h6 class="currency">₹</h6>
                                            <h6 class="price"><?php echo $row['aamount'];?></h6>
                                            <h6 class="period"><?php echo $le=$row['atime'];?></h6>
									   </div>
										<ul class="pricing-table__list text-left">
                                            <h5><?php echo $row['amain'];?></h5>                                          
                                            <h7><?php echo $row['atype'];?></h7> 
                               
											<br>
									 <input name="xxx" type="hidden" value="<?php echo $row['aamount'];?>">                                         
                            
                                    <input name="aid" type="hidden"  value="<?php echo $row['atype'];?>">                                           
                                    <input name="dept" type="hidden"  value="<?php echo $row['amain'];?>">     
										</ul>
                                    </div>
                                   
                                    <div class="pricing-table__body">
                                        <div class="pricing-table__footer">
                             </div>
                                      
                                    </div>
                                    <input name="Next" type="submit" class="btn" value="Next">           

                                    
					
                                    
                                </div>
                                								 </form>
  
                                      
                               
                                 
                                        
                                        
                                       
								                            </div>
								                             
                            

                            

								<?php  } ?>
								
								
                         
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <?php }?>
            
            
            
            
            <!--========= Pricing Table Area End ==========-->
            
             <?php 
                
                if($code==1)
                {
                ?>
                
                <div class="pricing-table-content-area">
                    <div class="container">
                        <div class="row pricing-table-one">
                                                  </div>
                        </div>
                         <div class="pricing-table-content-area">
                    <div class="container">
                        <div class="row pricing-table-one">
                              <?php 
							  $aid=$_GET['id2'];
							  $at=$_GET['id'];
$query = "SELECT * FROM `advc`  where amain='$at' and atype='$aid'";
$result = mysqli_query($connect, $query);
while ($row = mysqli_fetch_assoc($result)) {
    
    ?>                              <div class="col-12 col-md-6 col-lg-4 col-xl-4 pricing-table pricing-table--popular wow move-up">
                                            
                       
                                <form class="contact-form"  action="adv1.php" enctype="multipart/form-data" method="POST">

								<div class="pricing-table__inner">
                                    <div class="pricing-table__header">
                                          <div class="pricing-table__image">
                                            <img src="admin/<?php echo $row['image'];?>" class="img-fluid" alt="" style="width:200px;height:170px;">
                                        </div>
                                        <h6 class="sub-title"><?php echo $row['aname'];?></h6>
                                         <p><?php echo $row['bio'];?></p>

                                      
                                        <div class="pricing-table__price-wrap">
                                            <h6 class="currency">₹</h6>
                                            <h6 class="price"><?php echo $row['aamount'];?></h6>
                                            <h6 class="period"><?php echo $le=$row['atime'];?></h6>
									   </div>
										<ul class="pricing-table__list text-left">
                                            <h5><?php echo $row['amain'];?></h5>                                          
                                            <h7><?php echo $row['atype'];?></h7> 
                               
											<br>
										                                        
                                    <input name="aid" type="hidden"  value="<?php echo $row['atype'];?>">                                           
                                    <input name="dept" type="hidden"  value="<?php echo $row['amain'];?>">                                           
                                                                            

                                           
</br>					          <button name="xxx"  value="<?php echo $row['aamount'];?>" type="submit">Via Physically :-<?php echo $row['aamount'];?></button>

                                     <br><br>    <button name="xxx"  value="<?php echo round($row['aamount']*70/100);?>" type="submit">Via Vedio  Call Discount 30%:-<?php echo round($row['aamount']*70/100);?></button>
                                      <br><br>  <button name="xxx"  value="<?php echo round($row['aamount']*60/100);?>" type="submit">Via Phone Call Discount 40%:-<?php echo $row['aamount']*60/100;?></button>
                                      <br><br>  <button name="xxx"  value="<?php echo round($row['aamount']/2);?>" type="submit">Via Mail Discount 50%:-<?php echo round($row['aamount']/2);?></button>
                                      <br><br>    <button name="xxx"  value="<?php echo round($row['aamount']*40/100);?>" type="submit">Via Whatsapp Discount 60%:-<?php echo $row['aamount']*40/100;?></button>

										</ul>
                                    </div>
                                   
                                    <div class="pricing-table__body">
                                        <div class="pricing-table__footer">
                             </div>
                                      
                                    </div>

                                    
					
                                    
                                </div>
                                								 </form>
  
                                      
                               
                                 
                                        
                                        
                                       
								                            </div>
								                             
                            

                            

								<?php  } ?>
								
								
                         
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <?php }?>
          <!--============ Contact Us Area Start =================-->
            <div class="contact-us-area service-contact-bg section-space--ptb_100">
                <div class="container">
                    <div class="row align-items-center">

                        <div class="col-lg-4">
                            <div class="contact-info sytle-one service-contact text-left">

                                <div class="contact-info-title-wrap text-center">
                                    <div class="ht-star-rating lg-style">
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                    </div>
                                    <p class="sub-text">by 700+ customers for 3200+ clients</p>
                                </div>

                                   <div class="contact-list-item">
                                    <a href="tel:190068668" class="single-contact-list">
                                        <div class="content-wrap">
                                            <div class="content">
                                                <div class="icon">
                                                    <span class="fal fa-phone"></span>
                                                </div>
                                                <div class="main-content">
                                                    <h6 class="heading">Call for advice now!</h6>
                                                    <div class="text">(+91) 7279078783</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="mailto:netralaybgp@gmail.com" class="single-contact-list">
                                        <div class="content-wrap">
                                            <div class="content">
                                                <div class="icon">
                                                    <span class="fal fa-envelope"></span>
                                                </div>
                                                <div class="main-content">
                                                    <h6 class="heading">Say hello</h6>
                                                    <div class="text">manturani.pp@gmail.com</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                            </div>
                        </div>

                        <div class="col-lg-7 ms-auto">
                            <div class="contact-form-service-wrap">
                                <div class="contact-title text-center section-space--mb_40">
                                    <h3 class="mb-10">Need a hand?</h3>
                                    <p class="text">Reach out to the world’s most reliable IT services.</p>
                                </div>

                               <form class="contact-form"  action="" enctype="multipart/form-data" method="post">
                                    <div class="contact-form__two">
                                        <div class="contact-input">
                                            <div class="contact-inner">
                                                <input name="pname" type="text" placeholder="Name *" required>
                                            </div>
                                            <div class="contact-inner">
                                                <input name="pmobile" type="mobile" placeholder="Mobile *" required>
                                            </div>
                                        </div>
                                        <div class="contact-select">
                                            <div class="form-item contact-inner">
                                                <span class="inquiry">
                                        <select id="Visiting" required name="edept" required >
										   <option disabled selected>Select Department</option>
                                         <?php 
										 $query = "SELECT * FROM services";
										$result = mysqli_query($connect, $query);
										while ($row = mysqli_fetch_assoc($result)) {
    
											?>
                                         <option value="<?php echo $row['sname'];?>"><?php echo $row['sname'];?></option>
                                         
                                         
                                        <?php } ?>
										</select>

                                    </span>
                                            </div>
                                        </div>
                                        <div class="contact-inner contact-message">
                                            <textarea name="pmassage" placeholder="Please describe what you need."></textarea>
                                        </div>
                                        <div class="comment-submit-btn">
									<input name="submit" type="submit" class="btn" value="Book">
                                            <p class="form-messege-2"></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!--============ Contact Us Area End =================-->
           
        </div>

    <?php include "footer.php"?>
    </div>
    <!--====================  scroll top ====================-->
    <a href="#" class="scroll-top" id="scroll-top">
        <i class="arrow-top fal fa-long-arrow-up"></i>
        <i class="arrow-bottom fal fa-long-arrow-up"></i>
    </a>
    <!--====================  End of scroll top  ====================-->
    <!-- Start Toolbar -->
 
    <!-- End Toolbar -->

      <?php include "mobile.php"?>


    <!-- JS
    ============================================ -->
    <!-- Modernizer JS -->
    <script src="assets/js/vendor/modernizr-2.8.3.min.js"></script>

    <!-- jQuery JS -->
    <script src="assets/js/vendor/jquery-3.5.1.min.js"></script>
    <script src="assets/js/vendor/jquery-migrate-3.3.0.min.js"></script>

    <!-- Bootstrap JS -->
    <script src="assets/js/vendor/bootstrap.min.js"></script>

    <!-- Plugins JS (Please remove the comment from below plugins.min.js for better website load performance and remove plugin js files from avobe) -->

    <script src="assets/js/plugins/plugins.min.js"></script>

    <!-- Main JS -->
    <script src="assets/js/main.js"></script>


</body>


</html>