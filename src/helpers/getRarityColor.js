import RewardsRarity from '../const/rewardsRarity';

export default function getRarityColor(rarity) {
  switch (rarity) {
    case RewardsRarity.Common:
      return "white";
    case RewardsRarity.Rare:
      return "dodgerblue";
    case RewardsRarity.Epic:
      return "violet";
    case RewardsRarity.Legendary:
      return "gold";
  }
}