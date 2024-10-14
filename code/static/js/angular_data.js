var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope, $cookies, $cookieStore, $http) 
{
	
/****************************************************************************/
/************************** Get Admin Details ***********************************/
/****************************************************************************/	
	$scope.cook_admin_email = $cookieStore.get("cook_admin_email");
	$scope.cook_user_email = $cookieStore.get("cook_user_email");
	$scope.cook_staff_dept = $cookieStore.get("cook_staff_dept");

	$scope.user_logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.cook_admin_email = "";
			$cookies.cook_user_email = "";
			window.location = "index.html";
			return;
		}
		else
		{
			return false;
		}
	}
	
		$scope.admin_logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.cook_admin_email = "";
			$cookies.cook_user_email = "";
			window.location = "index.html";
			return;
		}
		else
		{
			return false;
		}
	}
	
	
	$http.post('get_site.php')
	.success(function(data, status, headers, config) 
	{
			$scope.site_details = data.details;
	});
	
	$http.post('get_area.php')
	.success(function(data, status, headers, config) 
	{
			$scope.area_details = data.details;
	});
	
	$http.post('get_spot.php')
	.success(function(data, status, headers, config) 
	{
			$scope.spot_details = data.details;
	});
	

/****************************************************************************/
/************************** create Site *********************************/
/****************************************************************************/
	$scope.create_site = function() 
	{
	$http.post('create_site.php', 
		{
		'field_1':$scope.field_1
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				   location.reload(); 
			return;				
			}
			else if(data.success == 2)
			{
				alert("Fill All Fields");
			}
			
			else
				{
					alert("Un Successfully");
				}
        });
    }
	
	/****************************************************************************/
/************************** create Area *********************************/
/****************************************************************************/
	$scope.create_area = function() 
	{
	$http.post('create_area.php', 
		{
		'field_1':$scope.field_1,'field_2':$scope.field_2
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				location.reload(); 
				return;				
			}
			else if(data.success == 2)
			{
				alert("Fill All Fields");
			}
			
			else
				{
					alert("Un Successfully");
				}
        });
    }


	/****************************************************************************/
/************************** create Area *********************************/
/****************************************************************************/
	$scope.create_spot = function() 
	{
	$http.post('create_spot.php', 
		{
		'field_1':$scope.field_1,'field_2':$scope.field_2
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				location.reload(); 
				return;				
			}
			else if(data.success == 2)
			{
				alert("Fill All Fields");
			}
			
			else
				{
					alert("Un Successfully");
				}
        });
    }


$scope.update_id = function(cus_id) 
	{
		window.location = "get_geolocation.html";
		$cookieStore.put("cook_cus_id",cus_id);
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	

$scope.update_image = function(cus_id) 
	{
		window.location = "file.html";
		$cookieStore.put("cook_app_id",cus_id);
		return;
	}	
	
	$scope.cook_app_id = $cookieStore.get("cook_app_id");
	
			
	$scope.update_location = function() 
	{		
	
		//$scope.get_Latitude = document.getElementById('get_Latitude').value;
		//$scope.get_Longitude = document.getElementById('get_Longitude').value;
		
        $http.post('update_location.php', 
			{	
			'field_1': $scope.field_1, 'field_2':$scope.field_2,
			'email':$scope.cook_cus_id
			})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Updated Successful");
				window.location = "view_students.html";
				//location.reload(); 
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
			{
				alert("Login Unsuccessful");
			}
        });
    }
	
	
	$scope.more_info = function(cus_id) 
	{
		window.location = "view_business_more.html";
		$cookieStore.put("cook_bus_id",cus_id);
		return;
	}	
	
	$scope.cook_bus_id = $cookieStore.get("cook_bus_id");

	$scope.view_rating = function(cus_id) 
	{
		window.location = "view_business_rating.html";
		$cookieStore.put("cook_cus_id",cus_id);
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");

	$http.post('get_survey_choice_user.php')
		.success(function(data, status, headers, config) 
		{
			$scope.user_survey_choice_details = data.details;
        });
		
	$http.post('get_bus_more.php', {'id': $scope.cook_bus_id})
	.success(function(data, status, headers, config) 
	{
			$scope.more_details = data.details;
    });
	
	$http.post('get_user_rating.php', {'email': $scope.cook_user_email})
	.success(function(data, status, headers, config) 
	{
			$scope.user_rating_details = data.details;
    });
	
	$http.post('get_bus_rating.php', {'email': $scope.cook_cus_id})
	.success(function(data, status, headers, config) 
	{
			$scope.bus_rating_details = data.details;
    });
	
/****************************************************************************/
/************************** Add Complaint *********************************/
/****************************************************************************/
	$scope.create_student = function() 
	{		
	$scope.field_9="";
		$http.post('create_student.php', {
		'field_1':$scope.field_1,'field_2':$scope.field_2,'field_3':$scope.field_3,
		'field_4':$scope.field_4,'field_5':$scope.field_5,'field_6':$scope.field_6,
		'field_7':$scope.field_7,'field_8':$scope.field_8,'field_9':$scope.field_9,
		'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Created Successfully");
				window.location = "user_home.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
			{
				alert("Un Successfully");
			}
        });
    }
/****************************************************************************/
/************************** admin Details *********************************/
/****************************************************************************/
	$http.post('admin_get.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.admin_details = data.details;
		}
		else
		{
			$scope.admin_details = "No Data Found !!!";
		}
    });
/****************************************************************************/
/************************** Get Feedback *********************************/
/****************************************************************************/
	$http.post('feedback_get.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.feedback_details = data.details;
		}
		else
		{
			$scope.feedback_details = "No Data Found !!!";
		}
    });
/****************************************************************************/
/************************** Get All details  *********************************/
/****************************************************************************/
	$http.post('get_tour.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.user_bus_details = data.details;
		}
		else
		{
			$scope.user_bus_details = "No Data Found !!!";
		}
    });
	
	$http.post('student_get.php',{'email':$scope.cook_user_email})
	.success(function(data, status, headers, config) 
	{
			$scope.details = data.details;
    });
	
	$http.post('get_cart.php',{'email':$scope.cook_user_email})
	.success(function(data, status, headers, config) 
	{
			$scope.user_cart_details = data.details;
    });
	
	$http.post('get_order.php',{'email':$scope.cook_user_email})
	.success(function(data, status, headers, config) 
	{
			$scope.user_order_details = data.details;
    });
	
	$http.post('get_new_order.php',{'email':$scope.cook_user_email})
	.success(function(data, status, headers, config) 
	{
			$scope.user_new_order_details = data.details;
    });
	
	$http.post('get_sport.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.sport_details = data.details;
		}
		else
		{
			$scope.sport_details = "No Data Found !!!";
		}
    });
	
/****************************************************************************/
/************************** Add Requriments *********************************/
/****************************************************************************/
	$scope.create_feedback = function() 
	{		
		$http.post('create_feedback.php', 
		{
		'field_1':$scope.field_1,'field_2':$scope.field_2,'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Feedback Submitted Successfully");
				window.location = "user_home.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 0)
			{
				alert("Error In Creating");
			}
			else
				{
					alert("Un Successfully");
				}
        });
    }

	
/****************************************************************************/
/************************** User Update *********************************/
/****************************************************************************/
	
		$http.post('get_user_info.php',
		{
			'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
				$scope.userdetails = data.details;
          });
		  
$scope.user_update_info = function(name,password,mobile) 
	{
		window.location = "user_info_edit.html";
		$cookieStore.put("cook_name",name);
		$cookieStore.put("cook_password",password);
		$cookieStore.put("cook_mobile",mobile);
		return;
	}	
	
	$scope.cook_name = $cookieStore.get("cook_name");
	$scope.cook_password = $cookieStore.get("cook_password");
	$scope.cook_mobile = $cookieStore.get("cook_mobile");

	$scope.save_update_info = function() 
	{		
		$http.post('user_update_info.php',{
		 'name':$scope.cook_name, 'password':$scope.cook_password,
		 'mobile': $scope.cook_mobile, 'email': $scope.cook_user_email})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "user_update_info.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }
	 
	 
/****************************************************************************/
/************************** Delete Products *********************************/
/****************************************************************************/
	// products_delete
	$scope.delete_bus = function(cus_id) 
	{		
        $http.post('delete_bus.php', 
		{
		'id': cus_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Deleted Successful");
				window.location = "view_students.html";
				return;
			}
			else if(data.success == 0)
			{
				alert("Error While Deleting Product!!");
			}
			else
			{
				alert("No id found");
			}
        });
    }

	$scope.delete_cart = function(cus_id) 
	{		
        $http.post('delete_cart.php', 
		{
		'id': cus_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Deleted Successful");
				window.location = "view_cart.html";
				return;
			}
			else if(data.success == 0)
			{
				alert("Error While Deleting Product!!");
			}
			else
			{
				alert("No id found");
			}
        });
    }

	$scope.create_rating = function(cus_id) 
	{		
        $http.post('create_rating.php', 
		{
		'id': cus_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Rated Successful");
				window.location = "view_business.html";
				return;
			}
			else if(data.success == 0)
			{
				alert("Error While Deleting Product!!");
			}
			else
			{
				alert("No id found");
			}
        });
    }

/****************************************************************************/
/************************** Student Update *********************************/
/****************************************************************************/
$scope.update_student = function(cus_id,field_1,field_2,field_3,
								 field_4,field_5,field_6,field_7,field_8) 
	{
		window.location = "update_student.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_1",field_1);
		$cookieStore.put("cook_field_2",field_2);
		$cookieStore.put("cook_field_3",field_3);
		$cookieStore.put("cook_field_4",field_4);
		$cookieStore.put("cook_field_5",field_5);
		$cookieStore.put("cook_field_6",field_6);
		$cookieStore.put("cook_field_7",field_7);
		$cookieStore.put("cook_field_8",field_8);
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");
	$scope.cook_field_2 = $cookieStore.get("cook_field_2");
	$scope.cook_field_3 = $cookieStore.get("cook_field_3");
	$scope.cook_field_4 = $cookieStore.get("cook_field_4");
	$scope.cook_field_5 = $cookieStore.get("cook_field_5");
	$scope.cook_field_6 = $cookieStore.get("cook_field_6");
	$scope.cook_field_7 = $cookieStore.get("cook_field_7");
	$scope.cook_field_8 = $cookieStore.get("cook_field_8");

	$scope.save_student = function() 
	{		
		$http.post('save_student.php',{
		'id':$scope.cook_cus_id,'field_1':$scope.cook_field_1,'field_2':$scope.cook_field_2,
		'field_3':$scope.cook_field_3,'field_4':$scope.cook_field_4,
		'field_5':$scope.cook_field_5,'field_6':$scope.cook_field_6,
		'field_7':$scope.cook_field_7,'field_8':$scope.cook_field_8})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "view_students.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }


	/****************************************************************************/
/************************** Get All details  *********************************/
/****************************************************************************/
	$http.post('work_get.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.work_details = data.details;
		}
		else
		{
			$scope.work_details = "No Data Found !!!";
		}
    });
/****************************************************************************/
/************************** Create Survey Question **************************/
/************************** create_choice		 **************************/
/****************************************************************************/
$scope.update_survey = function(cus_id,field_1) 
	{
		window.location = "survey_answer.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_1",field_1);
		return;
	}	
	
$scope.submit_survey = function() 
	{
		window.location = "view_rating_user.html";
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");

	
	$scope.create_choice_user = function(field_2,field_3,field_4,
					field_5,field_6,field_7,field_8,field_9) 
	{		
        $http.post('create_choice_user.php', 
		{
		'id': $scope.cook_cus_id,'email': $scope.cook_field_1,
		'field_2': field_2,'field_3': field_3,'field_4': field_4,
		'field_5': field_5,'field_6': field_6,'field_7': field_7,
		'field_8': field_8,'field_9': field_9,
		'field_10': $scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				//alert("Successful");
				//window.location = "survey_answer.html";
				//return;
			}
			else if(data.success == 0)
			{
				alert("Failed!!");
			}
			else
			{
				alert("No id found");
			}
        });
    }

	
	 /****************************************************************************/
/************************** Contract Status Update *********************************/
/****************************************************************************/
	
$scope.update_status_con = function(cus_id,field_9) 
	{
		window.location = "con_status_edit.html";
		$cookieStore.put("cook_con_id",cus_id);
		$cookieStore.put("cook_con_status",field_9);
		
		return;
	}	
	
	$scope.cook_con_id = $cookieStore.get("cook_con_id");
	$scope.cook_con_status = $cookieStore.get("cook_con_status");

	$scope.save_con_status = function() 
	{		
		$http.post('con_update_status.php',{
		 'cus_id':$scope.cook_con_id, 'field_9':$scope.cook_con_status})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "view_con_details.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }

/****************************************************************************/
/************************** Get All User details  *********************************/
/****************************************************************************/
	$http.post('user_get_all.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.all_user_details = data.details;
		}
		else
		{
			$scope.all_user_details = "No Data Found !!!";
		}
    });
	/*
$scope.update_cart = function(email,field_1,field_2,field_3,
								 field_4,field_12) 
	{
		window.location = "view_cart.html";
		$cookieStore.put("cook_email",email);
		$cookieStore.put("cook_field_1",field_1);
		$cookieStore.put("cook_field_2",field_2);
		$cookieStore.put("cook_field_3",field_3);
		$cookieStore.put("cook_field_4",field_4);
		$cookieStore.put("cook_field_12",field_12);
		return;
	}	
	
	$scope.cook_email = $cookieStore.get("cook_email");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");
	$scope.cook_field_2 = $cookieStore.get("cook_field_2");
	$scope.cook_field_3 = $cookieStore.get("cook_field_3");
	$scope.cook_field_4 = $cookieStore.get("cook_field_4");
	$scope.cook_field_12 = $cookieStore.get("cook_field_12");
*/
	$scope.update_cart = function(email,field_1,field_2,field_3,field_4,field_12) 
	{		
		$http.post('update_cart.php',{
		'field_1':field_1,'field_2':field_2,
		'field_3':field_3,'field_4':field_4,'field_12':field_12,
		'field_5':email,'email':$scope.cook_user_email})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Cart Added successfully");
				window.location = "view_cart.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }


	$scope.place_order = function(email,field_1,field_2,field_3,field_4,field_5) 
	{		
		$http.post('place_order.php',{
		'email':email,'field_1':field_1,'field_2':field_2,
		'field_3':field_3,'field_4':field_4,
		'field_5':field_5})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Ordered Placed successfully");
				window.location = "view_order.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }


	
});