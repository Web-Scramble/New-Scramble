import Signup from "./signup";
import VerifyOtp from "./otp_verification";
import OtpSuccess from "./otp_success";
import CreateAccount from "./account_creation";
import AccountSuccess from "./account_success";

export {Signup,VerifyOtp,OtpSuccess,CreateAccount,AccountSuccess}

// import colors from '@/themes/colors';
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity,
// } from 'react-native';
// import { Text, Button, Menu, Provider, Divider, RadioButton, IconButton, Card } from 'react-native-paper';
// import { Dropdown } from 'react-native-element-dropdown';
// import DateTimePickerInput from '@/components/shared/DateTimePickerInput';
// import { List } from 'react-native-paper';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import Entypo from '@expo/vector-icons/Entypo';
// import * as ImagePicker from 'expo-image-picker';
// import { Photo } from '@/types/maintenance/workOrderTypes';
// import { useInspectionStore } from '@/store/maintenance/useInspectionStore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { apiUrl } from '@/services/fetcher';
// import { ProgressModal } from '@/components/shared/ProgressModal';

// interface Field {
//   id: string;
//   label: string;
//   type: string;
//   required?: boolean;
//   description?: string;
//   instructions?: string;
//   pass_label?: string;
//   fail_label?: string;
//   choices?: { text: string }[];
// }

// interface DynamicFormProps {
//   formStructure: Field[];
//   formData: any;
//   setFormData: (data: any) => void;
// }


// const DynamicForm: React.FC<DynamicFormProps> = ({
//   formStructure,
//   formData,
//   setFormData,
// }) => {

//   const { uploadPhoto } = useInspectionStore()
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);
//   const [showComment, setShowComment] = useState<{ [key: string]: boolean }>({});
//   const [photos, setPhotos] = useState<Photo[]>([]);
//   const [showPhoto, setShowPhoto] = useState<{ [key: string]: boolean }>({});

//   const fileInputRefs = useRef<{ [key: string]: any }>({});
//   const [checked, setChecked] = useState<string>('first');
//   const [expanded, setExpanded] = useState<boolean>(true);
//   const handlePress = () => setExpanded(!expanded);
//   const [notes, setNotes] = useState<string>('');
//   const [currentComment, setCurrentComment] = useState<string>('');
//   const [modalVisible, setModalVisible] = useState(false)
//   const [menuVisible, setMenuVisible] = useState(false)

//   const uploadPhotos = async (photos:any) => {
//     const token = await AsyncStorage.getItem('token');
//     const headers = {
//       Accept: 'application/json',
//       ...(token && { Authorization: `Bearer ${token}` }),
//     };
  
//     const uploadPromises = photos.map(photo => {
//       const formData = new FormData();
//       formData.append('file', {
//         uri: photo.uri,
//         name: photo.name,
//         type: photo.type,
//       });
//       return fetch(`${apiUrl}/shared/upload-file`, {
//         method: 'POST',
//         body: formData,
//         credentials: 'include',
//         headers,
//       })
//         .then(response => {
//           if (!response.ok) {
//             return response.json().then(errorData => {
//               throw new Error(errorData.message || 'Failed to upload photo');
//             });
//           }
//           return response.json();
//         })
//         .then(data => {
//           console.log("Photo uploaded successfully: ", data);
//           return data;
//         });
//     });
  
//     return Promise.all(uploadPromises);
//   };
//   const pickImageFromLibrary = async (index:string, item:string) => {
//     try {
//       setMenuVisible(false);
  
//       // Request media library permissions
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Sorry, we need media library permissions to pick images!');
//         return;
//       }
    
//       // Launch image library
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ['images', 'videos'],
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });  
//       if (result.canceled) return;
  
//       // Prepare selected photos
//       const selectedPhotos = result.assets.map(asset => ({
//         uri: asset.uri,
//         name: asset.fileName,
//         type: asset.mimeType,
//       }));

//       if (selectedPhotos.length === 0) return;
  
//       // Set modal visible and upload photos
//       setModalVisible(true);
//      const newPhoto = await uploadPhotos(selectedPhotos);

//     // Update photos and selected work order state
//     const updatedPhotos = [...photos, ...newPhoto];
//     handleUpdateFormData(index,item, null, null, newPhoto)
//     setPhotos(updatedPhotos);
//     // setSelectedWorkOrder({ ...selectedItem, photos: updatedPhotos });
  
//       console.log("All photos uploaded successfully.", newPhoto, updatedPhotos);
//       setModalVisible(false)

//     } catch (error) {
//       console.error("Error picking or uploading images: ", error.message);
//       setModalVisible(false)
//     }
//   };


//   const takePhotoWithCamera = async (index:string, item:string) => {

//     try {
//      // Ask for permission to access camera
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Sorry, we need camera permissions to take photos!');
//       return;
//     }

//     // Launch camera
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ['images', 'videos'],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (result.canceled)  return
//       // Prepare selected photos
//       const selectedPhotos = result.assets.map(asset => ({
//         uri: asset.uri,
//         name: asset.fileName,
//         type: asset.mimeType,
//       }));
  
//       if (selectedPhotos.length === 0) return;
  
//       // Set modal visible and upload photos
//       setModalVisible(true);
//       const newPhoto = await uploadPhotos(selectedPhotos);
//       // Update photos and selected work order state
//       const updatedPhotos = [...photos, ...newPhoto];
//       handleUpdateFormData(index,item, null, null, newPhoto)
//       setPhotos(updatedPhotos);
//       // setSelectedWorkOrder({ ...selectedItem, photos: updatedPhotos });
  
//       console.log("All photos uploaded successfully.");
//       setModalVisible(false)


//       } catch (error) {
//         console.error("Error uploading files: ", error.message);
//         setModalVisible(false)

//       }
//   };
//   const handleUpdateFormData = (
//     fieldId: string,
//     item: string,
//     value: number | string | null,
//     comment: string | null,
//     photo: any | null
//   ) => {
//     console.log("New Photos");
//     console.log(photo);
    
//     setFormData((prevState) => {
//       const updatedItems = [...(prevState.items || [])];
//       const existingItemIndex = updatedItems.findIndex(
//         (i) => i.workflow_id === fieldId
//       );
  
//       if (existingItemIndex !== -1) {
//         // Update existing item
//         const existingItem = updatedItems[existingItemIndex];
//         updatedItems[existingItemIndex] = {
//           ...existingItem,
//           value: value !== null ? value : existingItem.value,
//           // Only add comment if it's not null
//           ...(comment !== null && { comment }),
//           photos: photo !== null
//           ? [...(existingItem.photos || []), ...photo.map(p => p.file)]
//           : existingItem.photos,
//         };
//       } else {
//         // Add new item
//         updatedItems.push({
//           workflow_id: fieldId,
//           item: item,
//           value: value !== null ? value : "",
//           // Only add comment if it's not null
//           ...(comment !== null && { comment }),
//           photos: photo !== null ? photo.map(p => p.file) : [], // Add file objects directly

//         });
//       }
  
//       return { ...prevState, items: updatedItems };
//     });
//   };
  
//   // Helper functions to get values
//   const getFieldValue = (fieldId: string): string | number => {
//     const item = formData.items?.find((i) => i.workflow_id === fieldId);
//     return item?.value || ''; // Default to empty string if not found
//   };

//   const getCommentValue = (fieldId: string): string => {
//     const item = formData.items?.find((i) => i.workflow_id === fieldId);
//     return item?.comment || ''; // Default to empty string if not found
//   };

//   const getPhotos = (fieldId: string): any[] => {
//     const item = formData.items?.find((i) => i.workflow_id === fieldId);
//     console.log("Photos in item:", item?.photos);
//     return item?.photos || [];
//   };
  

//   const renderField = (field: Field) => {
//     return (
//       <View key={field.id} style={styles.fieldContainer}>
//         {/* Field Label */}
//         {field.type === 'section' ? (
//           <Text style={styles.label}>
//             {field?.label?.charAt(0)?.toLocaleUpperCase() + field?.label?.slice(1)}
//           </Text>
//         ) : (
//           <View style={{ flexDirection: 'row', marginTop: 10 }}>
//             <Text style={styles.label}>
//               {field?.label?.charAt(0)?.toLocaleUpperCase() + field?.label?.slice(1)}
//             </Text>
//             {field.required && (
//               <Text style={[styles.label, { color: 'red' }]}>*</Text>
//             )}
//           </View>
//         )}

//         {/* Field Instructions */}
//         {field.instructions && (
//           <Text style={styles.instructions}>{field.instructions}</Text>
//         )}

//         {/* Field Input */}
//         {(() => {
//           switch (field.type) {
//             case 'text':
//             case 'free_text':
//               return (
//                 <TextInput
//                   style={styles.input}
//                   value={getFieldValue(field.id)?.toString() || ''}
//                   onChangeText={(text) =>
//                     handleUpdateFormData(field.id, field.type, text, null,null)
//                   }
//                   placeholder="Enter the text here"
//                 />
//               );
//             case 'number':
//               return (
//                 <TextInput
//                   style={styles.input}
//                   value={getFieldValue(field.id)?.toString() || ''}
//                   onChangeText={(text) =>
//                     handleUpdateFormData(field.id, field.type, Number(text), null,null)
//                   }
//                   keyboardType="numeric"
//                   placeholder=""
//                 />
//               );
//             case 'dropdown':
//               return (
//                 <Dropdown
//                   style={styles.input}
//                   data={
//                     field.choices?.map((choice) => ({
//                       label: choice.text,
//                       value: choice.text,
//                     })) || []
//                   }
//                   labelField="label"
//                   valueField="value"
//                   placeholder="Select..."
//                   value={getFieldValue(field.id)?.toString() || ''}
//                   onChange={(item) =>
//                     handleUpdateFormData(field.id, field.type, item.value, null,null)
//                   }
//                 />
//               );
//             case 'date_time':
//               return (
//                 <DateTimePickerInput
//                   label={field.label}
//                   value={getFieldValue(field.id)?.toString() || ''}
//                   onChange={(value) =>
//                     handleUpdateFormData(field.id, field.type, value, null,null)
//                   }
//                   mode="date_time"
//                 />
//               );
//             case 'date_only':
//               return (
//                 <DateTimePickerInput
//                   label={field.label}
//                   value={getFieldValue(field.id)?.toString() || ''}
//                   onChange={(value) =>
//                     handleUpdateFormData(field.id, field.type, value, null,null)
//                   }
//                   mode="date_only"
//                 />
//               );
//             case 'meter_entry':
//               return (
//                 <TextInput
//                   style={styles.input}
//                   value={getFieldValue(field.id)?.toString() || ''}
//                   multiline
//                   onChangeText={(text) =>
//                     handleUpdateFormData(field.id, field.type, Number(text), null,null)
//                   }
//                   keyboardType="numeric"
//                   placeholder=""
//                 />
//               );
//             case 'signature':
//               return (
//                 <TextInput
//                   style={styles.input}
//                   value={getFieldValue(field.id)?.toString() || ''}
//                   onChangeText={(text) =>
//                     handleUpdateFormData(field.id, field.type, text, null,null)
//                   }
//                   placeholder="Type your name to sign"
//                 />
//               );
//             case 'pass_fail':
//               return (
//                 <View style={styles.passFailContainer}>
//                   {/* RadioButton for "Pass" */}
//                   <View style={styles.radioButtonContainer}>
//                     <RadioButton
//                       value="pass"
//                       status={
//                         getFieldValue(field.id)?.toString() === 'pass'
//                           ? 'checked'
//                           : 'unchecked'
//                       }
//                       onPress={() =>
//                         handleUpdateFormData(field.id, field.type, 'pass', null,null)
//                       }
//                     />
//                     <Text style={styles.radioLabel}>
//                       {field.pass_label || 'Pass'}
//                     </Text>
//                   </View>

//                   {/* RadioButton for "Fail" */}
//                   <View style={styles.radioButtonContainer}>
//                     <RadioButton
//                       value="fail"
//                       status={
//                         getFieldValue(field.id)?.toString() === 'fail'
//                           ? 'checked'
//                           : 'unchecked'
//                       }
//                       onPress={() =>
//                         handleUpdateFormData(field.id, field.type, 'fail', null,null)
//                       }
//                     />
//                     <Text style={styles.radioLabel}>
//                       {field.fail_label || 'Fail'}
//                     </Text>
//                   </View>
//                 </View>
//               );
//             default:
//               return null;
//           }
//         })()}

//         {/* Add Remark Button */}
//         {
//           field.type !== 'section' && (
//             <>
//         <TouchableOpacity
//           style={{
//             marginTop: 5,
//             width: '100%',
//             flexDirection: 'row',
//             justifyContent: 'flex-end',
//             alignItems: 'center',
//           }}
//           onPress={() => setShowComment((prev) => ({ ...prev, [field.id]: !prev[field.id] }))}
//         >
//           <Text style={styles.addRemarkText}>Add Remark</Text>
//         </TouchableOpacity>
//         <Divider/>

//             </>
//           )
//         }

//         {/* Comment Section */}
//         {showComment[field.id] && (
//           <Card style={{ marginTop: 10, backgroundColor: 'white' }}>
//             <Card.Content>
//               <Text style={{ marginBottom: 5, fontSize:14, fontWeight:'bold' }}>Comment</Text>
//               <TextInput
//                 style={styles.commentInput}
//                 placeholder="Enter your comment"
//                 value={getCommentValue(field.id)}
//                 onChangeText={(text) => {
//                   setCurrentComment(text);
//                   handleUpdateFormData(field.id, field.type, null, text,null);
//                 }}
//                 multiline
//               />
//               {/* Photo Upload Actions */}
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   marginTop: 20,
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                 }}
//               >
//                 <Text style={{ marginTop: 0,fontSize:14, fontWeight:'bold' }}>Photos</Text>
//                 <View style={{ flexDirection: 'row', gap: 2, width: '20%' }}>
//                    <MaterialIcons name="photo-camera" onPress={() => takePhotoWithCamera(field.id, field.type)} size={24} color='grey' />
//                   <Entypo name="upload-to-cloud" onPress={() =>pickImageFromLibrary(field.id, field.type)} size={24} color={colors.secondary} />
//                 </View>
//               </View>
//             </Card.Content>
//           </Card>
//         )}
//         <ScrollView horizontal>
//         {getPhotos(field.id).map((photo, index) => (
//           <Image
//             key={index}
//             source={{ uri: photo.src }} // Use the `src` property of the file object
//             style={styles.photo}
//           />
//         ))}
// 				</ScrollView>



//         {/* Field Divider */}
//         {/* {field.type !== 'section' && <Divider style={{ marginTop: 20 }} />} */}
//       </View>
//     );
//   };

//   if (!formData.vehicle_id) {
//     return (
//       <Text style={styles.noVehicleText}>
//         Please select a vehicle to display the form.
//       </Text>
//     );
//   }

//   return (
//     <Provider>
//       <ScrollView style={styles.container}>
//         {formStructure.map((field) => renderField(field))}
//       </ScrollView>
//       <ProgressModal
//         modalVisible={modalVisible}
//         setModalVisible={setModalVisible}
//       />
//     </Provider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   fieldContainer: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   dropdownTrigger: {
//     fontSize: 16,
//     color: colors.primary,
//     textAlign: 'center',
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 4,
//     borderRadius: 4,
//     backgroundColor: '#fff',
//     marginTop: 8,
//     justifyContent: 'center',
//     textAlign: 'right', // Aligns the button to the right
//     textDecorationColor: colors.secondary
//   },
//   addRemarkDropdownTrigger: {
//     fontSize: 14,
//     color: colors.primary,
//     textAlign: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//     marginTop: 8,
//     marginLeft: 8,
//     marginRight: 0,
//   },
//   addRemarkContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end', // Aligns the button to the right
//     marginTop: 8,
//   },
//   addRemarkButton: {
//     // padding: 2, // Optional: Add some padding for better touch feedback
//   },
//   addRemarkText: {
//     color: colors.secondary, // Replace with the color code for blue or your theme color
//     fontSize: 14,
//     fontWeight: '400',
//     paddingTop: 16,
//     paddingBottom: 16,
//     textRendering: 'optimizeSpeed',
//     textAlign: 'left',
//   },
//   description: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 8,
//   },
//   instructions: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 4,
//   },
//   noVehicleText: {
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 16,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 8,
//     borderRadius: 4,
//     backgroundColor: '#fff',
//   },
//   card: {
//     marginBottom: 16,
//     backgroundColor: colors.white
//   },
//   passFailContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     marginTop: 8,

//   },
//   radioButtonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 8,
//   },
//   radioLabel: {
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   passButton: {
//     flex: 1,
//     marginRight: 4,
//   },
//   failButton: {
//     flex: 1,
//     marginLeft: 4,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: '#3D80A0'
//   },
//   // addRemarkButton: {
//   //   backgroundColor: '#1e90ff',
//   //   paddingVertical: 8,
//   //   paddingHorizontal: 16,
//   //   borderRadius: 4,
//   //   marginTop: 8,
//   // },
//   // addRemarkText: {
//   //   color: '#fff',
//   //   fontSize: 14,
//   //   textAlign: 'center',
//   // },

//   commentInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 8,
//     borderRadius: 4,
//     backgroundColor: '#fff',
//     height:60,
//     textAlignVertical:"top"
//     // marginTop: 8,
//   },
//   photoPreviewContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 8,
//   },
//   photo: {
//     width: 80,
//     height: 80,
//     marginRight: 8,
//     marginBottom: 8,
//     borderRadius: 4,
//   },

// });

// export default DynamicForm;
