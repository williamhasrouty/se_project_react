import ClothesSection from "./ClothesSection/ClothesSection";
import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onEditProfile,
  onSignOut,
  isEditProfileOpen,
  onCloseEditProfile,
  onUpdateUser,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={onCloseEditProfile}
        onUpdateUser={onUpdateUser}
      />
    </div>
  );
}

export default Profile;
